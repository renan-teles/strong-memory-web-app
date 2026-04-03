import { computed, Injectable, Signal, signal } from '@angular/core';
import { IApiResponse } from '../../../../../../shared/models/api-response.interface';
import { IUserData } from '../../../../models/user-data.interface';
import { ICreatedUser } from '../../../../models/created-user.interface';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { IUpdatePasswordData } from '../../../../models/update-password-data.interface';
import { AbstractCrudUsersUiFacade } from '../abstract-crud-users-ui.facade';
import { IUpdateState } from '../../../../../../shared/models/update-state.interface';

@Injectable({
  providedIn: 'root',
})
export class CrudPlayerUiFacade extends AbstractCrudUsersUiFacade {
  constructor() {
    super();
  }

  protected readonly _updatePasswordState = signal<IUpdateState>({
    isUpdating: false,
    success: false,
  });

  readonly isUpdatingPassword: Signal<boolean> = computed(() => {
    return this._updatePasswordState().isUpdating;
  });

  readonly updatePasswordSuccess: Signal<boolean> = computed(() => {
    return this._updatePasswordState().success;
  });

  override register(data: IUserData): void {
    this._registerState.update((s) => ({
      ...s,
      isRegistering: true,
      success: false,
    }));

    this.facade
      .registerPlayer(data)
      .pipe(
        tap((response: IApiResponse<ICreatedUser>) => {
          this._registerState.update((s) => ({
            ...s,
            success: true,
          }));

          this.alert.success(response.message);
          this.router.navigate(['/auth/player/login']);
        }),

        catchError(() => {
          this._registerState.update((s) => ({
            ...s,
            success: false,
          }));
          return EMPTY;
        }),

        finalize(() => {
          this._registerState.update((s) => ({
            ...s,
            isRegistering: false,
          }));
        }),
      )
      .subscribe();
  }

  updatePassword(data: IUpdatePasswordData): void {
    this._updatePasswordState.update((s) => ({
      ...s,
      isUpdating: true,
      success: false,
    }));

    this.facade
      .updatePlayerPassword(data)
      .pipe(
        tap(() => {
          this._updatePasswordState.update((s) => ({
            ...s,
            success: true,
          }));
          this.alert.success('Senha atualizada com sucesso.');
        }),

        catchError(() => {
          this._updatePasswordState.update((s) => ({
            ...s,
            success: false,
          }));
          return EMPTY;
        }),

        finalize(() => {
          this._updatePasswordState.update((s) => ({
            ...s,
            isUpdating: false,
          }));
        }),
      )
      .subscribe();
  }

  resetUpdatePasswordState(): void {
    this._updatePasswordState.update((s) => ({
      ...s,
      success: false,
      isUpdatting: false,
    }));
  }
}
