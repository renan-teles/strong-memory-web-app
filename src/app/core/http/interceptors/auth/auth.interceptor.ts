import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { SKIP_AUTH } from '../../tokens/skip-auth.context';
import { AuthApiService } from '../../../../features/auth/data/services/auth-api/auth-api.service';
import {
  isRefreshTokenErrorContext,
  isTokenExpirated,
} from '../../../../shared/types/api/error-response.utils';
import { handleRefresh } from './auth-refresh.helper';
import { AuthStateService } from '../../../services/auth/auth-state.service';
import { ErrorCode } from '../../../../shared/types/api/error-code.enum';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authState: AuthStateService = inject(AuthStateService);
  const authService: AuthApiService = inject(AuthApiService);

  if (req.context.get(SKIP_AUTH)) {
    return next(req);
  }

  const token: string = authState.getAccessToken();

  let authReq = req;

  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401) {
        return throwError(() => error);
      }

      const code: ErrorCode = error.error.data.code;
      if (isTokenExpirated(code)) {
        return handleRefresh(req, next, authService, authState);
      }

      if (isRefreshTokenErrorContext(code)) {
        authState.clearAndRedirectToLogin();
        return throwError(() => error);
      }

      authState.clearAndRedirectToLogin();
      return throwError(() => error);
    }),
  );
};
