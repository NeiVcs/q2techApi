import { ZodObject, ZodRawShape } from 'zod/v4';
import { CodeErrors, InvalidFieldsException } from '@shared/exceptions';
import { BaseErrorType } from '@shared/exceptions/codeError/types';

/**
 * Validates a request synchronously using a Zod schema.
 *
 * @param {ZodObject<T>} schema - The Zod schema that defines the structure of the input data.
 * @param {any} requestData - The request data that will be validated.
 * @throws {InvalidFieldsException} Throws an exception if validation fails, with error messages.
 * @template T - The type of the Zod schema, based on the structure of the expected request data.
 */
export const validateRequest = <T extends ZodRawShape>(schema: ZodObject<T>, requestData: any): void => {
  const result = schema.safeParse(requestData);
  if (result && !result.success) {
    const errors: BaseErrorType[] = result.error.issues.map(({ message }) => ({
      code: CodeErrors.CODE_ERROR_FIELDS_INVALID.code,
      message: message || CodeErrors.CODE_ERROR_FIELDS_INVALID.message
    }));
    throw new InvalidFieldsException(errors);
  }
};

/**
 * Validates a request asynchronously using a Zod schema.
 *
 * @param {ZodObject<T>} schema - The Zod schema that defines the structure of the input data.
 * @param {any} requestData - The request data that will be validated.
 * @returns {Promise<void>} Returns a Promise that resolves when the validation is completed.
 * @throws {InvalidFieldsException} Throws an exception if the asynchronous validation fails, with error messages.
 * @template T - The type of the Zod schema, based on the structure of the expected request data.
 */
export const validateRequestAsync = async <T extends ZodRawShape>(schema: ZodObject<T>, requestData: any): Promise<void> => {
  const result = await schema.safeParseAsync(requestData);
  if (result && !result.success) {
    const errors: BaseErrorType[] = result.error.issues.map(({ message }) => ({
      code: CodeErrors.CODE_ERROR_FIELDS_INVALID.code,
      message: message || CodeErrors.CODE_ERROR_FIELDS_INVALID.message
    }));
    throw new InvalidFieldsException(errors);
  }
};
