import { Project, PropertySignature, Type } from 'ts-morph';
import { existsSync } from 'node:fs';
import * as path from 'node:path';
import { createFile } from '../utils/fs-utils';
import { toHeadersCase } from '../utils/utils';

// Recursive mock generator
function mockValue(type: Type): any {
  if (type.isString()) return 'fakeString';
  if (type.isNumber()) return 123;
  if (type.isBoolean()) return true;
  if (type.getText().includes('Date')) return new Date('2025-01-01');
  if (type.isArray()) return [mockValue(type.getArrayElementTypeOrThrow())];
  if (type.isInterface() || type.isObject()) {
    const obj: any = {};
    type.getProperties().forEach((prop) => {
      const propType = prop.getTypeAtLocation(prop.getValueDeclarationOrThrow());
      obj[prop.getName()] = mockValue(propType);
    });
    return obj;
  }
  return {};
}

// Safely generate mock from DTO file
function safeDtoToMock(dtoPath: string, dtoName: string): any | null {
  if (!existsSync(dtoPath)) return null;
  return dtoToMock(dtoPath, dtoName);
}

// Generate mock from DTO interface
function dtoToMock(dtoPath: string, dtoName: string): any {
  const project = new Project();
  project.addSourceFileAtPath(dtoPath);
  const sourceFile = project.getSourceFileOrThrow(dtoPath);
  const dto = sourceFile.getInterfaceOrThrow(dtoName);

  const mockObj: any = {};
  dto.getProperties().forEach((prop: PropertySignature) => {
    const type = prop.getType();
    mockObj[prop.getName()] = mockValue(type);
  });
  return mockObj;
}

// Main test generator
export function generateTestGenerator(
  baseTestDir: string,
  moduleName: string,
  pascalFeature: string,
  folderType: 'controller' | 'transformer' | 'service',
  statusCode: number,
  schema: any,
  force: boolean
) {
  let type = folderType === 'controller' ? 'Controller' : folderType === 'transformer' ? 'Transformer' : 'Service';

  const inputDtoPath = path.resolve(`src/modules/${moduleName}/dto/${pascalFeature}InputDTO.ts`);
  const outputDtoPath = path.resolve(`src/modules/${moduleName}/dto/${pascalFeature}OutputDTO.ts`);

  const inputMock = safeDtoToMock(inputDtoPath, `${pascalFeature}InputDTO`);
  const outputMock = safeDtoToMock(outputDtoPath, `${pascalFeature}OutputDTO`);

  let content = '';

  if (folderType === 'transformer') {
    let tests = '';

    if (inputMock) {
      tests += `
  it("deve mapear corretamente fromApi", () => {
    const request: any = ${requestGen(inputMock, schema)};
    const dto = transformer.fromApi(request);
    expect(dto).toMatchObject(${JSON.stringify(inputMock, null, 2)});
  });`;
    }

    if (outputMock) {
      tests += `
  it("deve mapear corretamente toApi", () => {
    const outputDTO: any = ${JSON.stringify(outputMock, null, 2)};
    const result = transformer.toApi(outputDTO);
    expect(result).toMatchObject(${JSON.stringify(outputMock, null, 2)});
  });`;
    }

    content = `import { ${pascalFeature}Transformer } from "../../../../src/modules/${moduleName}/transformers/${pascalFeature}Transformer";

describe("${pascalFeature}Transformer", () => {
  let transformer: ${pascalFeature}Transformer;

  beforeEach(() => {
    transformer = new ${pascalFeature}Transformer();
  });
  ${tests}
});
`;
  }

  if (folderType === 'controller') {
    let tests = '';

    // 204 (No Content) normalmente não tem body de resposta.
    const isNoContent = statusCode === 204;

    // Monta um request coerente com o schema. Se não houver InputDTO, usa objeto vazio.
    const requestExpr = requestGen(inputMock, schema);

    if (isNoContent) {
      tests = `
  it("deve chamar service e retornar 204 sem body", async () => {
    const inputDTO = ${inputMock ? JSON.stringify(inputMock, null, 2) : '{}'};

    transformer.fromApi.mockReturnValue(inputDTO);
    service.execute.mockResolvedValue(undefined as any);

    const result = await controller.handler(${requestExpr} as any, reply);

    expect(transformer.fromApi).toHaveBeenCalled();
    expect(service.execute).toHaveBeenCalledWith(inputDTO);
    expect(reply.code).toHaveBeenCalledWith(${statusCode});
    expect(result).toBeUndefined();
  });`;
    } else if (inputMock && outputMock) {
      tests = `
  it("deve chamar service e transformer corretamente", async () => {
    const inputDTO = ${JSON.stringify(inputMock, null, 2)};
    const outputDTO = ${JSON.stringify(outputMock, null, 2)};

    transformer.fromApi.mockReturnValue(inputDTO);
    service.execute.mockResolvedValue(outputDTO);
    transformer.toApi.mockReturnValue(outputDTO);

    const result = await controller.handler(${requestExpr} as any, reply);

    expect(transformer.fromApi).toHaveBeenCalled();
    expect(service.execute).toHaveBeenCalledWith(inputDTO);
    expect(transformer.toApi).toHaveBeenCalledWith(outputDTO);
    expect(reply.code).toHaveBeenCalledWith(${statusCode});
    expect(result).toEqual(outputDTO);
  });`;
    }

    content = `import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { ${pascalFeature}Controller } from "../../../../src/modules/${moduleName}/controllers/${pascalFeature}Controller";
import { ${pascalFeature}Transformer } from "../../../../src/modules/${moduleName}/transformers/${pascalFeature}Transformer";
import { ${pascalFeature}Service } from "../../../../src/modules/${moduleName}/services/${pascalFeature}Service";

describe("${pascalFeature}Controller", () => {
  let controller: ${pascalFeature}Controller;
  let transformer: jest.Mocked<${pascalFeature}Transformer>;
  let service: jest.Mocked<${pascalFeature}Service>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new ${pascalFeature}Controller(transformer, service);
  });
  ${tests}
});
`;
  }

  if (folderType === 'service') {
    content = `import {container} from "tsyringe";
import {${pascalFeature}${type}} from "../../../../src/modules/${moduleName}/${folderType}s/${pascalFeature}${type}";
        
describe('${pascalFeature}${type}', () => {
     let ${folderType}: ${pascalFeature}${type};
     
     beforeEach(() => {
         jest.clearAllMocks();
         ${folderType} = container.resolve(${pascalFeature}${type});
     });
     
     it('Deve testar cenario de ${pascalFeature}', async () => {
         //TODO: Implementar testes corretamente.
         expect('${pascalFeature}').toEqual('${pascalFeature}');
     });
 
});
`;
  }

  createFile(path.join(baseTestDir, folderType + 's', `${pascalFeature}${type}.spec.ts`), content, force);
}

function requestGen(inputMock: any | null, schema: any) {
  const mockObj = inputMock && typeof inputMock === 'object' ? inputMock : {};

  const pickBySchemaProps = (section?: { type?: string; properties?: Record<string, any> }) => {
    const props = section?.properties;

    if (!props || typeof props !== 'object') {
      return null;
    }

    const out: Record<string, any> = {};
    for (const key of Object.keys(props)) {
      if (key && key.includes('-')) {
        out[key] = mockObj[toHeadersCase(key)];
        continue;
      }
      if (mockObj[key] !== undefined) {
        out[key] = mockObj[key];
      }
    }

    return Object.keys(out).length ? out : null;
  };

  const parts: string[] = [];

  const bodyObj = pickBySchemaProps(schema?.body);
  if (bodyObj) {
    parts.push(`body: ${JSON.stringify(bodyObj, null, 2)}`);
  }

  const paramsObj = pickBySchemaProps(schema?.params);
  if (paramsObj) {
    parts.push(`params: ${JSON.stringify(paramsObj, null, 2)}`);
  }

  const querySchema = schema?.querystring ?? schema?.query;
  const queryObj = pickBySchemaProps(querySchema);
  if (queryObj) {
    parts.push(`query: ${JSON.stringify(queryObj, null, 2)}`);
  }

  const headersObj = pickBySchemaProps(schema?.headers);
  if (headersObj) {
    parts.push(`headers: ${JSON.stringify(headersObj, null, 2)}`);
  }

  return parts.length ? `{\n  ${parts.join(',\n  ')}\n}` : `{}`;
}
