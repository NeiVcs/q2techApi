import { CodeErrors } from '@shared/exceptions/codeError';
import { BaseAbstractException } from '@shared/exceptions/BaseAbstractException';
import { BaseErrorType } from '@shared/exceptions/codeError/types';

export class ConflictAlreadyExistsException extends BaseAbstractException {
  constructor(error?: BaseErrorType, message?: string) {
    if (error) {
      super(409, [error]);
      return;
    }
    super(409, [
      {
        code: CodeErrors.CODE_ERROR_RESOURCE_ALREADY_EXISTS.code,
        message: message || CodeErrors.CODE_ERROR_RESOURCE_ALREADY_EXISTS.message
      }
    ]);
  }
}
