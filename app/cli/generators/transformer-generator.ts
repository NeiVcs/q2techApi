import { defaultValueByType, toHeadersCase } from '../utils/utils';
import { tsTypeFromSchema } from '../utils/schema-utils';

/**
 * @description
 * Gera linhas de mapeamento de API para DTO (fromApi)
 * @param {object} props - Propriedades do schema
 * @param {string} sourcePath - Caminho da origem (ex: source)
 * @returns {string[]}
 */
export function generateFromApiMapper(props: any, sourcePath: string = 'request'): string[] {
  const lines: string[] = [];
  for (const [key, value] of Object.entries(props)) {
    const v = value as any;
    if (v.type === 'object' && v.properties) {
      const subLines = generateFromApiMapper(v.properties, `${sourcePath}?.${key}`).map((l) => `    ${l}`);
      lines.push(`${key}: ${sourcePath}?.${key} ? {\n${subLines.join('\n')}\n  } : undefined,`);
    } else if (v.type === 'array') {
      if (v.items?.type === 'object' && v.items?.properties) {
        const subLines = generateFromApiMapper(v.items.properties, 'f').map((l) => `      ${l}`);
        lines.push(`${key}: Array.isArray(${sourcePath}?.${key}) ? ${sourcePath}.${key}.map(f => ({\n${subLines.join('\n    ')}\n    })) : [],`);
      } else {
        lines.push(`${key}: Array.isArray(${sourcePath}?.${key}) ? [...${sourcePath}.${key}] : [],`);
      }
    } else if (sourcePath === 'headers') {
      lines.push(`${toHeadersCase(key)}: ${sourcePath}['${key}'],`);
    } else if (sourcePath === 'params') {
      lines.push(`${key}: ${sourcePath}.${key},`);
    } else {
      lines.push(`${key}: ${sourcePath}?.${key} || ${defaultValueByType(tsTypeFromSchema(v.type))},`);
    }
  }

  return lines;
}

/**
 * @description
 * Gera linhas de mapeamento de DTO para API (toApi)
 * @param {object} props - Propriedades do schema
 * @param {string} sourcePath - Caminho do DTO (ex: outputDTO)
 * @returns {string[]}
 */
export function generateToApiMapper(props: any, sourcePath: string = 'outputDTO'): string[] {
  const lines: string[] = [];

  for (const [key, value] of Object.entries(props)) {
    const v = value as any;

    if (v.type === 'object' && v.properties) {
      const subLines = Object.entries(v.properties)
        .map(([subKey, subVal]: [string, any]) => {
          const subType = subVal.type;
          return `${subKey}: ${sourcePath}?.${key}?.${subKey} ?? ${defaultValueByType(tsTypeFromSchema(subType))},`;
        })
        .map((l) => `    ${l}`);
      lines.push(`${key}: ${sourcePath}?.${key} ? {\n${subLines.join('\n')}\n  } : undefined,`);
    } else if (v.type === 'array') {
      if (v.items?.type === 'object' && v.items?.properties) {
        const subLines = Object.entries(v.items.properties)
          .map(([subKey, subVal]: [string, any]) => {
            const subType = subVal.type;
            return `${subKey}: f?.${subKey} ?? ${defaultValueByType(tsTypeFromSchema(subType))},`;
          })
          .map((l) => `      ${l}`);
        lines.push(`${key}: Array.isArray(${sourcePath}?.${key}) ? ${sourcePath}.${key}.map(f => ({\n${subLines.join('\n')}\n    })) : [],`);
      } else {
        lines.push(`${key}: Array.isArray(${sourcePath}?.${key}) ? [...${sourcePath}.${key}] : [],`);
      }
    } else {
      lines.push(`${key}: ${sourcePath}?.${key} ?? ${defaultValueByType(tsTypeFromSchema(v.type))},`);
    }
  }

  return lines;
}
