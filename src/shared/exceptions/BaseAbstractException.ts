import { BaseErrorType } from '@shared/exceptions/codeError/types';

export abstract class BaseAbstractException extends Error {
  protected constructor(
    public readonly statusCode: number,
    public readonly errors: BaseErrorType[] = []
  ) {
    const hasErrors = Array.isArray(errors) && errors.length > 0;
    let message = 'Internal Server Error';
    if (hasErrors) {
      try {
        message = JSON.stringify(errors);
      } catch {
        message = 'Internal Server Error';
      }
    }

    super(message);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
