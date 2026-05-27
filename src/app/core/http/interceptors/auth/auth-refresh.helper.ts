import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { BehaviorSubject, switchMap, catchError, throwError, filter, take } from 'rxjs';
import { AuthApiService } from '../../../../features/auth/data/services/auth-api/auth-api.service';
import { AuthStateService } from '../../../services/auth/auth-state.service';
import { ApiResponse } from '../../../../shared/types/api/api-response.interface';
import { AuthResponse } from '../../../../features/auth/data/dto/response/auth-response';

let isRefreshing = false;

const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export function handleRefresh(
  req: HttpRequest<any>,
  next: HttpHandlerFn,
  authApi: AuthApiService,
  authState: AuthStateService,
) {
  /*
   * Se NÃO estiver renovando:
   * inicia refresh
   */
  if (!isRefreshing) {
    isRefreshing = true;

    refreshTokenSubject.next(null);

    return authApi.refreshToken().pipe(
      switchMap((response: ApiResponse<AuthResponse>) => {
        isRefreshing = false;

        const accessToken: string = response.data!.accessToken;
        const userRole: string = response.data!.role;

        /*
         * Salva novo token
         * em memória
         */
        authState.setAccessToken(accessToken);
        authState.setUserRole(userRole);

        /*
         * Libera fila
         */
        refreshTokenSubject.next(accessToken);

        /*
         * Reexecuta request original
         */
        return next(
          req.clone({
            setHeaders: {
              Authorization: `Bearer ${accessToken}`,
            },
          }),
        );
      }),

      catchError((error) => {
        isRefreshing = false;
        authState.clearAndRedirectToLogin();
        return throwError(() => error);
      }),
    );
  }

  /*
   * Se JÁ estiver renovando:
   * espera novo token
   */
  return refreshTokenSubject.pipe(
    filter((token) => token != null),

    take(1),

    switchMap((token) => {
      return next(
        req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        }),
      );
    }),
  );
}
