/**
 * @description
 * Converte string para PascalCase
 * @param {string} str
 */
export function toPascalCase(str: string) {
  return str.replace(/(^\w|_\w)/g, (m) => m.replace('_', '').toUpperCase());
}

/**
 * @description
 * Converte PascalCase para camelCase
 * @param {string} str
 */
export function toCamelCase(str: string) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

/**
 * @description
 * Converte string para kebab-case
 * @param {string} str
 */
export function toKebabCase(str: string) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/_/g, '-')
    .toLowerCase();
}

export function toHeadersCase(str: string) {
  return toCamelCase(
    str
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2') // quebra camelCase/PascalCase
      .replace(/[-_\s]+/g, ' ') // normaliza separadores
      .trim()
      .split(' ')
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join('')
  );
}

/**
 * @description
 * Retorna valor padrão de um tipo TypeScript
 * @param {string} type
 */
export function defaultValueByType(type: string): string {
  switch (type) {
    case 'string':
      return `''`;
    case 'number':
      return '0';
    case 'boolean':
      return 'false';
    case 'any[]':
      return '[]';
    default:
      return 'undefined';
  }
}

export function isPaginationObject(v: any) {
  if (v.type !== 'object' || !v.properties) {
    return false;
  }
  const keys = Object.keys(v.properties);
  return (
    keys.length === 3 &&
    keys.includes('page') &&
    keys.includes('pageSize') &&
    keys.includes('total') &&
    v.properties.page.type === 'number' &&
    v.properties.pageSize.type === 'number' &&
    v.properties.total.type === 'number'
  );
}

export function generateFastifyRequestType(schema, pascalFeature) {
  // Gerar tipagem condicional do FastifyRequest
  const reqTypes: string[] = [];
  if (schema.body) reqTypes.push(`Body: ${pascalFeature}BodyRequest`);
  if (schema.params) reqTypes.push(`Params: ${pascalFeature}ParamsRequest`);
  if (schema.querystring) reqTypes.push(`Querystring: ${pascalFeature}QueryRequest`);
  if (schema.headers) reqTypes.push(`Headers: ${pascalFeature}HeadersRequest`);

  return reqTypes.length > 0 ? `{ ${reqTypes.join('; ')} }` : `any`;
}

export function importsFastifyRequestType(schema, hasOutput, moduleName, pascalFeature) {
  try {
    const reqTypes: string[] = [];
    if (schema.body) reqTypes.push(`${pascalFeature}BodyRequest`);
    if (schema.params) reqTypes.push(`${pascalFeature}ParamsRequest`);
    if (schema.querystring) reqTypes.push(`${pascalFeature}QueryRequest`);
    if (schema.headers) reqTypes.push(`${pascalFeature}HeadersRequest`);
    if (hasOutput) reqTypes.push(`${pascalFeature}Response`);

    return reqTypes.length > 0 ? `import { ${reqTypes.join(', ')} } from '@modules/${moduleName}/schemas/${pascalFeature}Schema'` : ``;
  } catch (e) {
    return '';
  }
}
