import { BaseAbstractException } from '@shared/exceptions/BaseAbstractException';
import { CodeErrors } from '@shared/exceptions/codeError';

export class AccessDeniedException extends BaseAbstractException {
  constructor() {
    super(401, [CodeErrors.CODE_ERROR_ACCESS_DENIED]);
  }
}
