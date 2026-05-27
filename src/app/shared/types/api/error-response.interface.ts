import { ErrorCode } from './error-code.enum';

export interface ErrorResponse<T> {
  code: ErrorCode;
  data?: T;
}
