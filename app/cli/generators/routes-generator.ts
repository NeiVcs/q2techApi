import { join } from 'node:path';
import { existsSync, writeFileSync } from 'node:fs';

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function ensureRouteFiles(moduleDir: string, moduleName: string) {
  const capitalizedModuleName = capitalizeFirst(moduleName);

  const privateRoute = join(moduleDir, 'private.routes.v1.ts');
  if (!existsSync(privateRoute)) {
    writeFileSync(
      privateRoute,
      `import {FastifyInstance, FastifyPluginAsync} from "fastify";

/**
 * Registers private routes for API version 1.
 *
 * @param {FastifyInstance} fastifyInstance - The Fastify instance where the routes will be registered.
 */
export const private${capitalizedModuleName}RoutesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
    //TODO: Implemente aqui as rotas privadas
};
            `,
      'utf-8'
    );
    console.log(`✅ Arquivo criado: ${privateRoute}`);
  }

  const publicRoute = join(moduleDir, 'public.routes.v1.ts');
  if (!existsSync(publicRoute)) {
    writeFileSync(
      publicRoute,
      `import {FastifyInstance, FastifyPluginAsync} from "fastify";

/**
 * Registers public routes for API version 1.
 *
 * @param {FastifyInstance} fastifyInstance - The Fastify instance where the routes will be registered.
 */
export const public${capitalizedModuleName}RoutesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
    //TODO: Implemente aqui as rotas publicas
};
            `,
      'utf-8'
    );
    console.log(`✅ Arquivo criado: ${publicRoute}`);
  }
}
