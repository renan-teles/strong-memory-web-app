import { computed, Signal, signal } from '@angular/core';
import { IUserData } from '../../../models/user-data.interface';
import { AbstractUsersUiFacade } from '../abstract-users-ui.facade';
import { IUpdatePasswordData } from '../../../models/update-password-data.interface';
import { IRegisterState } from '../../../../../shared/models/register-state.interface';
import { IUpdateState } from '../../../../../shared/models/update-state.interface';

export abstract class AbstractCrudUsersUiFacade extends AbstractUsersUiFacade {
  constructor() {
    super();
  }

  protected readonly _registerState = signal<IRegisterState>({
    isRegistering: false,
    success: false,
  });

  readonly isRegistering: Signal<boolean> = computed(() => {
    return this._registerState().isRegistering;
  });

  readonly registerSuccess: Signal<boolean> = computed(() => {
    return this._registerState().success;
  });

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

  abstract register(data: IUserData): void;
  abstract updatePassword(data: IUpdatePasswordData): void;

  resetUpdatePasswordState(): void {
    this._updatePasswordState.update((s) => ({
      ...s,
      success: false,
      isUpdatting: false,
    }));
  }
}
