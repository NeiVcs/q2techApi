import { isPaginationObject, toHeadersCase, toPascalCase } from '../utils/utils';
import { createFile } from '../utils/fs-utils';
import * as path from 'node:path';
import { tsTypeFromSchema } from '../utils/schema-utils';

/**
 * @description
 * Gera recursivamente a estrutura de um DTO baseado nas propriedades do schema.
 * Cria sub-DTOs e arquivos separados automaticamente quando necessário.
 *
 * @param {string} name - Nome do DTO a ser gerado
 * @param {Record<string, any>} props - Propriedades do schema (JSON Schema)
 * @param {string[]} required - Lista de campos obrigatórios
 * @returns {string} - Código TypeScript do DTO gerado (como string)
 *
 * @example
 * const dtoCode = generateDTO('UserInputDTO', schema.body.properties, schema.body.required);
 */
export function generateDTO(
  name: string,
  props: { [key: string]: any },
  required: string[] = [],
  imports: Set<string> = new Set(),
  pascalFeatureLocal: string = '',
  force: boolean = false,
  baseDir: string
): string {
  const lines: string[] = [];

  for (const [key, value] of Object.entries(props)) {
    const v = value as any;
    const optional = required.includes(key) ? '' : '?';

    if (key === 'pagination' && isPaginationObject(v)) {
      imports.add('PaginationDTO');
      lines.push(`  pagination${optional}: PaginationDTO;`);
      continue;
    }

    if (v.type === 'object' && v.properties) {
      const subName = pascalFeatureLocal + toPascalCase(key) + 'DTO';
      lines.push(`  ${key}${optional}: ${subName};`);
      const subDTO = generateDTO(subName, v.properties, v.required || [], imports, pascalFeatureLocal, force, baseDir);
      createFile(path.join(baseDir, 'dto', `${subName}.ts`), `export interface ${subName} {\n${subDTO}\n}`, force);
    } else if (v.type === 'array') {
      if (v.items?.type === 'object' && v.items?.properties) {
        const subName = pascalFeatureLocal + toPascalCase(key) + 'ItemDTO';
        lines.push(`  ${key}${optional}: ${subName}[];`);
        const subDTO = generateDTO(subName, v.items.properties, v.items.required || [], imports, pascalFeatureLocal, force, baseDir);
        createFile(path.join(baseDir, 'dto', `${subName}.ts`), `export interface ${subName} {\n${subDTO}\n}`, force);
      } else {
        const itemType = tsTypeFromSchema(v.items?.type) || 'any';
        lines.push(`  ${key}${optional}: ${itemType}[];`);
      }
    } else if (key.includes('-')) {
      const tsType = tsTypeFromSchema(v.type);
      lines.push(`  ${toHeadersCase(key)}${optional}: ${tsType};`);
    } else {
      const tsType = tsTypeFromSchema(v.type);
      lines.push(`  ${key}${optional}: ${tsType};`);
    }
  }

  return lines.join('\n');
}
