import { toPascalCase } from './utils';

/**
 * @description
 * Mapeia tipos do schema JSON para tipos TypeScript
 * @param {any} type
 */
export function tsTypeFromSchema(type: string): string {
  switch (type) {
    case 'string':
      return 'string';
    case 'number':
      return 'number';
    case 'integer':
      return 'number';
    case 'boolean':
      return 'boolean';
    case 'array':
      return 'any[]';
    case 'object':
      return 'Record<string, any>';
    default:
      return 'any';
  }
}

export function mergeSchemas(...schemas: any[]) {
  const filtered = schemas.filter(Boolean);
  if (filtered.length === 0) {
    return null;
  }
  const acc = { type: 'object', properties: {}, required: [] as string[] };
  for (const s of filtered) {
    if (!s || !s.properties) {
      continue;
    }
    acc.properties = { ...acc.properties, ...(s.properties || {}) };
    if (Array.isArray(s.required)) {
      acc.required = Array.from(new Set([...(acc.required || []), ...s.required]));
    }
  }
  return acc;
}

/**
 * @description
 * Coleta os sub-DTOs necessários para importações automáticas
 * @param {object} props - Propriedades do schema
 * @param {string} prefix - Prefixo do DTO pai (opcional)
 * @returns {string[]} lista de DTOs a importar
 */
export function collectDTOImports(props: any, pascalFeature: string, prefix = ''): string[] {
  let imports: string[] = [];

  for (const [key, value] of Object.entries(props)) {
    const v = value as any;

    if (v.type === 'object' && v.properties) {
      const subName = pascalFeature + toPascalCase(key) + 'DTO';
      imports.push(subName);
      imports.push(...collectDTOImports(v.properties, pascalFeature, subName));
    } else if (v.type === 'array') {
      if (v.items?.type === 'object' && v.items?.properties) {
        const subName = pascalFeature + toPascalCase(key) + 'ItemDTO';
        imports.push(subName);
        imports.push(...collectDTOImports(v.items.properties, pascalFeature, subName));
      }
    }
  }

  return imports;
}
