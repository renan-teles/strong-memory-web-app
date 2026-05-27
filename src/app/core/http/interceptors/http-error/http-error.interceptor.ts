import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { AlertService } from '../../../../shared/services/alert/alert.service';
import {
  isRefreshTokenErrorContext,
  isTokenErrorContext,
} from '../../../../shared/types/api/error-response.utils';
import { ErrorCode } from '../../../../shared/types/api/error-code.enum';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const alert: AlertService = inject(AlertService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const statusMessages: Record<number, string> = {
        500: 'Falha interna ao executar ação.',
        0: 'Erro de conexão com o servidor.',
      };

      const statusMessage: string = statusMessages[error.status];
      if (statusMessage) {
        alert.error(statusMessage);
        return throwError(() => error);
      }

      const code: ErrorCode = error.error.data.code;
      const message: string = error.error.message;

      const isAuthError: boolean = isTokenErrorContext(code) || isRefreshTokenErrorContext(code);
      if (!isAuthError) {
        alert.error(message);
      }

      return throwError(() => error);
    }),
  );
};
