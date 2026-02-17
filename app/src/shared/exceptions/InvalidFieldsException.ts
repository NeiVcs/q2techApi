import { BaseAbstractException } from '@shared/exceptions/BaseAbstractException';
import { BaseErrorType } from '@shared/exceptions/codeError/types';

export class InvalidFieldsException extends BaseAbstractException {
  constructor(errors: BaseErrorType[]) {
    super(400, errors);
  }
}
