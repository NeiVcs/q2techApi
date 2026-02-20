import { existsSync, readdirSync, writeFileSync } from 'node:fs';
import * as path from 'node:path';
import { toCamelCase } from '../utils/utils';

/**
 * @description Gera ou atualiza index.ts na raiz de um módulo
 * @param moduleDir Caminho do módulo
 */
export function generateModuleIndex(moduleDir: string) {
  const indexPath = path.join(moduleDir, 'index.ts');

  const importContainer = "import { container } from 'tsyringe';";
  const routeExports = ["\nexport * from './private.routes.v1';", "export * from './public.routes.v1';\n"];

  // Controllers
  const controllersDir = path.join(moduleDir, 'controllers');
  const controllersImports: string[] = [];
  const controllersExports: string[] = [];
  if (existsSync(controllersDir)) {
    readdirSync(controllersDir)
      .filter((f) => f.endsWith('.ts'))
      .forEach((file) => {
        const controllerName = path.basename(file, '.ts');
        controllersImports.push(`import { ${controllerName} } from "@modules/${path.basename(moduleDir)}/controllers/${controllerName}";`);
        controllersExports.push(`export const ${toCamelCase(controllerName)} = () => container.resolve(${controllerName});`);
      });
  }

  // Monta o conteúdo do index.ts sem duplicidade
  const finalLines: string[] = [importContainer, ...controllersImports, ...routeExports, ...controllersExports, ''];

  writeFileSync(indexPath, finalLines.join('\n'), 'utf-8');
}
