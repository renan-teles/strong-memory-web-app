import { Injectable, Signal, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap, catchError, EMPTY, Observable, finalize } from 'rxjs';
import { LoginRequest } from '../../../../data/dto/request/login-request';
import { ApiResponse } from '../../../../../../shared/types/api/api-response.interface';
import { AuthResponse } from '../../../../data/dto/response/auth-response';
import { LoginUseCase } from '../../../../domain/use-cases/login.use-case';
import { AuthApiService } from '../../../../data/services/auth-api/auth-api.service';
import { RequestState } from '../../../../../../shared/types/api/request-state.interface';
import { setStatusRequestState } from '../../../../../../shared/utils/request-state.utils';
import { AuthStateService } from '../../../../../../core/services/auth/auth-state.service';

@Injectable({
  providedIn: 'root',
})
export class LoginApiFacade {
  private readonly api: AuthApiService = inject(AuthApiService);
  private readonly router: Router = inject(Router);
  private readonly loginUser: LoginUseCase = inject(LoginUseCase);
  private readonly authState: AuthStateService = inject(AuthStateService);

  private readonly _state = signal<RequestState<void>>({
    status: 'idle',
  });

  readonly isAuthenticating: Signal<boolean> = computed(() => this._state().status === 'loading');
  readonly error: Signal<boolean> = computed(() => this._state().status === 'error');
  readonly success: Signal<boolean> = computed(() => this._state().status === 'success');
  readonly isIdle: Signal<boolean> = computed(() => this._state().status === 'idle');

  loginPlayer(data: LoginRequest): void {
    this.handleLogin(this.loginUser.execute(this.api.loginPlayer(data)), '/home');
  }

  loginAdministrator(data: LoginRequest): void {
    this.handleLogin(this.loginUser.execute(this.api.loginAdmin(data)), '/words/list');
  }

  restoreSession(): void {
    this.api
      .refreshToken()
      .pipe(
        tap((response: ApiResponse<AuthResponse>) => {
          this.authState.setAccessToken(response.data!.accessToken);
          this.authState.setUserRole(response.data!.role);
        }),
        catchError(() => {
          this.logout(false);
          return EMPTY;
        }),
      )
      .subscribe();
  }

  logout(redirect: boolean = true): void {
    this.api
      .logout()
      .pipe(
        finalize(() => {
          if (!redirect) return;
          this.authState.clearAndRedirectToLogin();
        }),
      )
      .subscribe();
  }

  private handleLogin(request$: Observable<ApiResponse<AuthResponse>>, redirectTo: string): void {
    setStatusRequestState<void>(this._state, 'loading');

    request$
      .pipe(
        tap(() => {
          setStatusRequestState<void>(this._state, 'success');
          this.router.navigate([redirectTo]);
        }),
        catchError(() => {
          setStatusRequestState<void>(this._state, 'error');
          return EMPTY;
        }),
      )
      .subscribe();
  }
}
