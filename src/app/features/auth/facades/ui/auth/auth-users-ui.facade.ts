import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { ILoginState } from '../../../../auth/models/login-state.interface';
import { IUserData } from '../../../../users/models/user-data.interface';
import { AlertService } from '../../../../../core/services/alert/alert.service';
import { Router } from '@angular/router';
import { AuthUsersFacade } from '../../auth-users.facade';

@Injectable({
  providedIn: 'root',
})
export class AuthUsersUiFacade {
  protected readonly facade: AuthUsersFacade = inject(AuthUsersFacade);
  protected readonly alert: AlertService = inject(AlertService);
  protected readonly router: Router = inject(Router);

  private readonly _loginState = signal<ILoginState>({
    isAuthenticating: false,
    success: false,
  });

  readonly isAuthenticating: Signal<boolean> = computed(() => {
    return this._loginState().isAuthenticating;
  });

  readonly success: Signal<boolean> = computed(() => {
    return this._loginState().success;
  });

  authPlayer(data: IUserData): void {
    this._loginState.update((s) => ({
      ...s,
      isAuthenticating: true,
      success: false,
    }));

    this.facade
      .loginPlayer(data)
      .pipe(
        tap(() => {
          this._loginState.update((s) => ({
            ...s,
            success: true,
          }));
          this.router.navigate(['/app/game/start']);
        }),

        catchError(() => {
          this._loginState.update((s) => ({
            ...s,
            success: false,
          }));
          return EMPTY;
        }),

        finalize(() => {
          this._loginState.update((s) => ({
            ...s,
            isAuthenticating: false,
          }));
        }),
      )
      .subscribe();
  }

  authAdministrator(data: IUserData): void {
    this._loginState.update((s) => ({
      ...s,
      isAuthenticating: true,
      success: false,
    }));

    this.facade
      .loginAdministrator(data)
      .pipe(
        tap(() => {
          this._loginState.update((s) => ({
            ...s,
            success: true,
          }));
          this.router.navigate(['/app/words/list']);
        }),

        catchError(() => {
          this._loginState.update((s) => ({
            ...s,
            success: false,
          }));
          return EMPTY;
        }),

        finalize(() => {
          this._loginState.update((s) => ({
            ...s,
            isAuthenticating: false,
          }));
        }),
      )
      .subscribe();
  }
}
