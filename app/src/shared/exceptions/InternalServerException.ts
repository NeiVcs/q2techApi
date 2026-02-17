import { CodeErrors } from '@shared/exceptions/codeError';
import { BaseAbstractException } from '@shared/exceptions/BaseAbstractException';

export class InternalServerException extends BaseAbstractException {
  constructor() {
    super(500, [CodeErrors.CODE_ERROR_SERVER_INTERNAL_ERROR]);
  }
}
