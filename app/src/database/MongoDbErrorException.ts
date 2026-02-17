import { CodeErrors, InvalidFieldsException } from "@shared/exceptions";

export class MongoDbErrorException {
  constructor(error: any) {
    if (error.code && error.code === 11000 && error.keyValue) {
      throw new InvalidFieldsException([
        {
          code: CodeErrors.CODE_ERROR_MONGODB_DUPLICATE_KEY.code,
          message: `Duplicate key: ${JSON.stringify(error.keyValue)}`,
        },
      ]);
    }
  }
}
