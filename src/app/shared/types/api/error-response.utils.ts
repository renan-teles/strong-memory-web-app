import { ErrorCode } from './error-code.enum';

export function isTokenExpirated(code: ErrorCode): boolean {
  return code === ErrorCode.TOKEN_EXPIRED;
}

export function isTokenErrorContext(code: ErrorCode) {
  return isTokenExpirated(code) || code === ErrorCode.INVALID_TOKEN;
}

export function isRefreshTokenErrorContext(code: ErrorCode): boolean {
  return (
    code === ErrorCode.REFRESH_TOKEN_EXPIRED ||
    code === ErrorCode.REFRESH_TOKEN_REVOKED ||
    code === ErrorCode.INVALID_REFRESH_TOKEN ||
    code == ErrorCode.NOT_FOUND_REFRESH_TOKEN
  );
}
