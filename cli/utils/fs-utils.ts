import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

/**
 * @description
 * Cria diretório recursivamente se não existir
 * @param {string} dir - Diretório do arquivo
 */
export function ensureDir(dir: string) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

/**
 * @description
 * Cria arquivo com conteúdo. Não sobrescreve se já existir, exceto se --force seja usado
 * @param {string} filePath - Caminho completo do arquivo
 * @param {string} content - Conteúdo do arquivo
 * @param force
 */
export function createFile(filePath: string, content: string, force = false) {
  if (existsSync(filePath) && !force) {
    console.log(`⚠️ Arquivo já existe: ${filePath} (use --force para sobrescrever)`);
    return;
  }
  ensureDir(dirname(filePath));
  writeFileSync(filePath, content);
  console.log(`✅ Arquivo criado: ${filePath}`);
}
