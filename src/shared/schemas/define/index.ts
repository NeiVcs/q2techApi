import { FromSchema } from 'json-schema-to-ts';

/**
 * Creates a JSON schema definition with strongly-typed TypeScript support.
 * Automatically infers types for `body`, `querystring`, `params`, `headers`, and `response` using `json-schema-to-ts`.
 *
 * @template T - A JSON Schema definition object.
 *
 * @param schema - The schema object with optional Fastify-compatible fields: `body`, `querystring`, `params`, `headers`, and `response`.
 *
 * @returns An object containing:
 * - `raw`: the original schema passed in.
 * - `types`: the inferred TypeScript types for each part of the schema.
 *
 * @example
 * const schema = createSchema({
 *   body: {
 *     type: 'object',
 *     properties: { name: { type: 'string' } },
 *     required: ['name']
 *   },
 *   response: {
 *     200: {
 *       type: 'object',
 *       properties: { id: { type: 'string' } },
 *       required: ['id']
 *     }
 *   }
 * });
 */
export function createSchema<
  const T extends {
    description?: string;
    summary?: string;
    tags?: string[];
    deprecated?: boolean;
    consumes?: string[];
    security?: any[];
    body?: Record<string, unknown>;
    querystring?: Record<string, unknown>;
    params?: Record<string, unknown>;
    headers?: Record<string, unknown>;
    response?: Record<number, Record<string, unknown>>;
  }
>(schema: T) {
  type Body = T['body'] extends object ? FromSchema<T['body']> : undefined;
  type Querystring = T['querystring'] extends object ? FromSchema<T['querystring']> : undefined;
  type Params = T['params'] extends object ? FromSchema<T['params']> : undefined;
  type Headers = T['headers'] extends object ? FromSchema<T['headers']> : undefined;
  type Response = {
    [K in keyof T['response']]: FromSchema<T['response'][K]>;
  };

  return {
    raw: schema,
    types: {
      body: null as unknown as Body,
      querystring: null as unknown as Querystring,
      params: null as unknown as Params,
      headers: null as unknown as Headers,
      response: null as unknown as Response
    } as const
  };
}
