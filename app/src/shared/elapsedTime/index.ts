/**
 * Calcula o tempo decorrido em milissegundos desde `startTime`.
 *
 * @param {[number, number]} startTime - Valor retornado por `process.hrtime()` no início do intervalo.
 * @returns {number} Tempo decorrido em milissegundos com precisão de 4 casas decimais.
 */
export function elapsedTime(startTime: [number, number]): number {
  const stop = process.hrtime(startTime);
  return Number(((stop[0] * 1e6 + stop[1]) / 1e6).toFixed(4));
}

/**
 * Extrai o tempo de início da requisição a partir do cabeçalho `x-request-start-time`.
 * Se o cabeçalho não estiver presente ou for inválido, retorna o tempo atual.
 *
 * @param {any} config - Configuração da requisição que pode conter os cabeçalhos.
 * @returns {[number, number]} Tempo de início da requisição.
 */
export function extractStartTimeHeader(config: any): [number, number] {
  try {
    const raw = config?.headers?.['x-request-start-time'];
    return raw ? <[number, number]>JSON.parse(String(raw)) : process.hrtime();
  } catch {
    return process.hrtime();
  }
}
