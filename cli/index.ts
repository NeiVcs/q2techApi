#!/usr/bin/env ts-node

import * as fs from 'node:fs';
import * as path from 'node:path';
import { createFile, ensureDir } from './utils/fs-utils';
import { collectDTOImports, mergeSchemas } from './utils/schema-utils';
import { generateFastifyRequestType, importsFastifyRequestType, toPascalCase } from './utils/utils';
import { generateDTO } from './generators/dto-generator';
import { generateFromApiMapper, generateToApiMapper } from './generators/transformer-generator';
import { ensureRouteFiles } from './generators/routes-generator';
import { generateModuleIndex } from './generators/module-generator';
import { generateTestGenerator } from './generators/test-generator';

/**
 * @description
 * Extrai parâmetros da linha de comando:
 * --m <module> : nome do módulo
 * --s <schema> : nome do schema
 * --force: força sobrescrever arquivos existentes
 */
const args = process.argv.slice(2);
const moduleIndex = args.indexOf('--m');
const schemaIndex = args.indexOf('--s');
const forceIndex = args.indexOf('--force');

if (moduleIndex === -1 || schemaIndex === -1) {
  console.error('❌ Uso correto: gen --m <module> --s <schema> [--force]');
  process.exit(1);
}

const moduleName = args[moduleIndex + 1];
const schemaName = args[schemaIndex + 1];
const force = forceIndex !== -1;
const baseModule = 'src/modules';
const baseModuleTest = 'tests/modules';

/**
 * @description
 * Define paths principais do módulo e schema
 */
const schemaPath = path.resolve(`${baseModule}/${moduleName}/schemas/${schemaName}.ts`);
if (!fs.existsSync(schemaPath)) {
  console.error(`❌ Schema não encontrado: ${schemaPath}`);
  process.exit(1);
}

const baseDir = path.resolve(baseModule, moduleName);
const baseTestDir = path.resolve(baseModuleTest, moduleName);

// --------------------
// 4️ Importar schema dinamicamente
// --------------------
const schemaModule = require(schemaPath);
const schema = schemaModule[schemaName];

const pascalFeature = toPascalCase(schemaName.replace('Schema', ''));

const combinedInputSchema = mergeSchemas(schema.headers, schema.params, schema.querystring, schema.body);

// --------------------
// 5️ Criar diretórios
// --------------------
const folders = ['dto', 'transformers', 'services', 'controllers'];
folders.forEach((f) => ensureDir(path.join(baseDir, f)));

const foldersTest = ['transformers', 'services', 'controllers'];
foldersTest.forEach((f) => ensureDir(path.join(baseTestDir, f)));

// --------------------
// 8️ Gerar DTOs (Input unificado)
// --------------------

if (combinedInputSchema && combinedInputSchema.properties) {
  const inputImports = collectDTOImports(combinedInputSchema.properties, pascalFeature).filter((subDTO) => !subDTO.includes('PaginationDTO'));

  let inputImportLines = '';
  inputImports.forEach((subDTO) => {
    inputImportLines += `import { ${subDTO} } from "@modules/${moduleName}/dto/${subDTO}";\n`;
  });
  if (inputImportLines.length > 0) {
    inputImportLines += '\n';
  }

  createFile(
    path.join(baseDir, 'dto', `${pascalFeature}InputDTO.ts`),
    `${inputImportLines}export interface ${pascalFeature}InputDTO {\n${generateDTO(
      pascalFeature + 'InputDTO',
      combinedInputSchema?.properties || {},
      combinedInputSchema?.required || [],
      new Set(),
      pascalFeature,
      force,
      baseDir
    )}\n}
    
    `,
    force
  );
} else {
  createFile(
    path.join(baseDir, 'dto', `${pascalFeature}InputDTO.ts`),
    `export interface ${pascalFeature}InputDTO {\n${generateDTO(pascalFeature + 'InputDTO', {}, [], new Set(), '', force, baseDir)}\n}`,
    force
  );
}

// --------------------
// OutputDTO (apenas se existir 200/201). Se houver 204 -> não cria OutputDTO
// --------------------
let outputProps: any = {};
let outputRequired: string[] = [];
let hasOutput = false; // true se 200 ou 201 com propriedades
let statusCode = 200; // default

if (schema.response?.['200']?.properties) {
  outputProps = schema.response['200'].properties;
  outputRequired = schema.response['200'].required || [];
  hasOutput = true;
  statusCode = 200;
} else if (schema.response?.['201']?.properties) {
  outputProps = schema.response['201'].properties;
  outputRequired = schema.response['201'].required || [];
  hasOutput = true;
  statusCode = 201;
} else if (schema.response?.['204']) {
  // 204 existe explicitamente: sem output
  console.log('ℹ️ Response 204 detectado, não será gerado OutputDTO nem toApi.');
  hasOutput = false;
  statusCode = 204;
} else {
  console.warn('⚠️ Response 200/201 não definido. OutputDTO vazio por padrão (nenhum campo gerado).');
}

const requestGeneric = generateFastifyRequestType(schema, pascalFeature);

const imports = new Set<string>();
let outputDTOLines = '';
if (hasOutput) {
  outputDTOLines = generateDTO(pascalFeature + 'OutputDTO', outputProps, outputRequired, imports, pascalFeature, force, baseDir);
}
const subDTOImports = hasOutput ? collectDTOImports(outputProps, pascalFeature).filter((subDTO) => !subDTO.includes('PaginationDTO')) : [];

let importLines = '';
if (imports.has('PaginationDTO')) {
  importLines += `import { PaginationDTO } from "@shared/dto/PaginationDTO";\n`;
}
subDTOImports.forEach((subDTO) => {
  importLines += `import { ${subDTO} } from "@modules/${moduleName}/dto/${subDTO}";\n\n`;
});

if (hasOutput) {
  createFile(path.join(baseDir, 'dto', `${pascalFeature}OutputDTO.ts`), `${importLines}export interface ${pascalFeature}OutputDTO {\n${outputDTOLines}\n}`, force);
}

// --------------------
// 9️Transformer manual, recursivo e seguro (ajustado para source unificado)
// --------------------

// Preparar imports para transformer: se hasOutput importar OutputDTO, sempre importar InputDTO
let transformerImportsSet = new Set<string>([
  ...collectDTOImports(combinedInputSchema?.properties || {}, pascalFeature).filter((subDTO) => !subDTO.includes('PaginationDTO')),
  ...(hasOutput ? collectDTOImports(outputProps || {}, pascalFeature).filter((subDTO) => !subDTO.includes('PaginationDTO')) : [])
]);

let transformerImportLines = '';
transformerImportsSet.forEach((subDTO) => {
  transformerImportLines += `import { ${subDTO} } from "@modules/${moduleName}/dto/${subDTO}";\n`;
});
if (transformerImportLines.length > 0) {
  transformerImportLines += '\n';
}

// O script original esperava importar tipos Request/Response do schema. Vamos importar (se existirem), mas usar `any` na assinatura de fromApi
const requestResponseImportLines = importsFastifyRequestType(schema, hasOutput, moduleName, pascalFeature);

// Gerar mapper fromApi usando `source` como objeto combinado de body, params e query
let fromApiLines: string;
if (combinedInputSchema && combinedInputSchema.properties) {
  const originLines: string[] = [];
  const destructuredKeys: string[] = [];
  if (schema.params) {
    destructuredKeys.push('params');
  }
  if (schema.querystring) {
    destructuredKeys.push('query');
  }
  if (schema.body) {
    destructuredKeys.push('body');
  }
  if (schema.headers) {
    destructuredKeys.push('headers');
  }
  if (destructuredKeys.length > 0) {
    originLines.push(`const { ${destructuredKeys.join(', ')} } = request;`);
  }

  const mapperSourceLines: string[] = [];
  if (schema.headers && schema.headers.properties) {
    const headersSource = generateFromApiMapper(schema.headers.properties, 'headers');
    mapperSourceLines.push(...headersSource);
  }
  if (schema.params && schema.params.properties) {
    const paramsSource = generateFromApiMapper(schema.params.properties, 'params');
    mapperSourceLines.push(...paramsSource);
  }
  if (schema.querystring && schema.querystring.properties) {
    const querySource = generateFromApiMapper(schema.querystring.properties, 'query');
    mapperSourceLines.push(...querySource);
  }
  if (schema.body && schema.body.properties) {
    const bodySource = generateFromApiMapper(schema.body.properties, 'body');
    mapperSourceLines.push(...bodySource);
  }

  fromApiLines = `public fromApi(request?: FastifyRequest<${requestGeneric}>): ${pascalFeature}InputDTO {
    ${originLines.join('\n    ')}

    return {
      ${mapperSourceLines.map((l) => ' ' + l).join('\n      ')}
    };
  }`;
} else {
  fromApiLines = `public fromApi(request?: FastifyRequest): ${pascalFeature}InputDTO {
    // fallback vazio
    return {};
  }`;
}

// Gerar toApi apenas se hasOutput
const toApiLinesArray = hasOutput ? generateToApiMapper(outputProps) : [];

createFile(
  path.join(baseDir, 'transformers', `${pascalFeature}Transformer.ts`),
  `import { singleton } from 'tsyringe';
  import {FastifyRequest} from 'fastify';
  ${requestResponseImportLines}
  import { ${pascalFeature}InputDTO } from "@modules/${moduleName}/dto/${pascalFeature}InputDTO";
  ${hasOutput ? `import { ${pascalFeature}OutputDTO } from "@modules/${moduleName}/dto/${pascalFeature}OutputDTO";` : ''}
  ${transformerImportLines}

@singleton()
export class ${pascalFeature}Transformer {
  ${fromApiLines}

  ${hasOutput
    ? `public toApi(outputDTO: ${pascalFeature}OutputDTO): ${pascalFeature}Response {
    return {
    ${toApiLinesArray.map((l) => '  ' + l).join('\n')}
    };
  }`
    : ``
  }
}
  `,
  force
);

// --------------------
// 10️Services (ajustar retorno quando não há output)
// --------------------
// const methodsList = { find: 'get', update: 'put', delete: 'delete', create: 'post' }
// const methodKey = Object.keys(methodsList).find((m) =>
//   pascalFeature.toLowerCase().includes(m)
// ) as keyof typeof methodsList | undefined;
// const method = methodKey ? methodsList[methodKey] : 'patch';
const rawAction = pascalFeature.replace(new RegExp(moduleName + '$', 'i'), '');
const action = rawAction.charAt(0).toLowerCase() + rawAction.slice(1);
const moduleToUpper = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
const needsIdMethod = ['findById', 'delete'].includes(action)
const noResponseMethod = !['update', 'delete'].includes(action)

createFile(
  path.join(baseDir, 'services', `${pascalFeature}Service.ts`),
  `import { singleton } from 'tsyringe';
import { ${pascalFeature}InputDTO } from "@modules/${moduleName}/dto/${pascalFeature}InputDTO";
import { ${moduleToUpper}Repository } from "@modules/company/data/${moduleToUpper}Repository";
${hasOutput ? `import { ${pascalFeature}OutputDTO } from "@modules/${moduleName}/dto/${pascalFeature}OutputDTO";` : ''}

@singleton()
export class ${pascalFeature}Service {
  constructor( private storage: ${moduleToUpper}Repository ) { }
  
  public async execute(inputDTO: ${pascalFeature}InputDTO): Promise<${hasOutput ? `${pascalFeature}OutputDTO` : `void`}> {
    ${noResponseMethod ? 'const response = ' : ''}await this.storage.${action}(inputDTO${needsIdMethod ? '.id' : ''});
    ${hasOutput ? `return response as unknown as ${pascalFeature}OutputDTO;` : `return;`}
  }
}
  `,
  force
);

// --------------------
// 11️Controllers (ajustar condicional para 204)
const responseType = `${pascalFeature}Response`;

// Controller terá request genérico (mantemos compatibilidade e evitamos tipagem quebrada)
let transformerFromApiLines: string;
let fastifyRequestTypeLines: string;
if (combinedInputSchema && combinedInputSchema.properties) {
  transformerFromApiLines = `const inputDTO = this.transformer.fromApi(request);`;
  fastifyRequestTypeLines = `request: FastifyRequest<${requestGeneric}>`;
} else {
  transformerFromApiLines = `const inputDTO = this.transformer.fromApi();`;
  fastifyRequestTypeLines = `_: FastifyRequest`;
}

let controllerReturnType = hasOutput ? responseType : 'void';

createFile(
  path.join(baseDir, 'controllers', `${pascalFeature}Controller.ts`),
  `import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
${requestResponseImportLines}
import { ${pascalFeature}Transformer } from '@modules/${moduleName}/transformers/${pascalFeature}Transformer';
import { ${pascalFeature}Service } from '@modules/${moduleName}/services/${pascalFeature}Service';

@singleton()
export class ${pascalFeature}Controller {
  constructor(
    private readonly transformer: ${pascalFeature}Transformer,
    private readonly service: ${pascalFeature}Service
  ) {}

  handler = async (${fastifyRequestTypeLines}, reply: FastifyReply): Promise<${controllerReturnType}> => {
    ${transformerFromApiLines}
    ${hasOutput ? `const outputDTO = await this.service.execute(inputDTO);\n    reply.code(${statusCode});\n    return this.transformer.toApi(outputDTO);` : `\n    await this.service.execute(inputDTO);\n    reply.code(${statusCode});`}
  }  
}
`,
  force
);

// finalizar arquivos auxiliares e index
ensureRouteFiles(`${baseModule}/${moduleName}`, moduleName);

generateModuleIndex(`${baseModule}/${moduleName}`);

generateTestGenerator(baseTestDir, moduleName, pascalFeature, 'controller', statusCode, schema, force);
generateTestGenerator(baseTestDir, moduleName, pascalFeature, 'transformer', statusCode, schema, force);
generateTestGenerator(baseTestDir, moduleName, pascalFeature, 'service', statusCode, schema, force);

console.log(`🎉 Scaffold ultra avançado gerado para módulo "${moduleName}" e schema "${schemaName}"`);
