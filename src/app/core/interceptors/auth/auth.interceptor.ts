import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { AuthStorageService } from '../../services/auth-storage/auth-storage.service';
import { SKIP_AUTH } from '../../../features/auth/skip-auth.context';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authStorage = inject(AuthStorageService);

  if (req.context.get(SKIP_AUTH)) {
    return next(req);
  }

  const token = authStorage.getToken();
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
      if (error.status === 401) {
        authStorage.clearAll();
        router.navigate(['/auth/player']);
      }
      return EMPTY;
    }),
  );
};
