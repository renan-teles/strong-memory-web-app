import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AlertService } from '../../services/alerts/alert.service';
import { inject } from '@angular/core';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const alert = inject(AlertService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'Erro inesperado.';
      let setError = true;

      switch (error.status) {
        case 400:
          message = 'Dados inválidos.';
          break;

        case 500:
          message = 'Erro interno do servidor.';
          break;

        case 0:
          message = 'Erro de conexão com o servidor.';
          break;

        default:
          setError = false;
          break;
      }

      if (setError) {
        alert.error(message);
        alert.timeoutToClear();
      }

      return throwError(() => error);
    }),
  );
};
