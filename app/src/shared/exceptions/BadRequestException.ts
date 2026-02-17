import { BaseAbstractException } from '@shared/exceptions/BaseAbstractException';
import { BaseErrorType } from '@shared/exceptions/codeError/types';

export class BadRequestException extends BaseAbstractException {
  constructor(error: BaseErrorType, message?: string) {
    if (message) {
      error.message = message;
    }
    super(400, [error]);
  }
}
