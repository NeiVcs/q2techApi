export const ensureExists = (result: any, message: string): void => {
  if (!result) {
    throw { type: 'NOT_FOUND', message: message };
  }
}
