import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AlertService } from '../../services/alert/alert.service';
import { inject } from '@angular/core';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const alert = inject(AlertService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message: string = 'Erro inesperado.';
      let setError: boolean = true;

      switch (error.status) {
        case 500:
          message = 'Falha ao executar ação.';
          break;

        case 0:
          message = 'Erro de conexão com o servidor.';
          break;

        default:
          setError = false;
          break;
      }

      if (setError) alert.error(message);
      else if (error.error?.message) alert.error(error.error.message);

      return throwError(() => error);
    }),
  );
};
