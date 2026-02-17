import { BaseAbstractException } from '@shared/exceptions/BaseAbstractException';
import { CodeErrors } from '@shared/exceptions/codeError';

export class ResourceNotFoundException extends BaseAbstractException {
  constructor(message?: string) {
    super(404, [
      {
        code: CodeErrors.CODE_ERROR_RESOURCE_NOT_FOUND.code,
        message: message || CodeErrors.CODE_ERROR_RESOURCE_NOT_FOUND.message
      }
    ]);
  }
}
