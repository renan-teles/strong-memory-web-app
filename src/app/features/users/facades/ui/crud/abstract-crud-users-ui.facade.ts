import { computed, Signal, signal } from '@angular/core';
import { IUserData } from '../../../models/user-data.interface';
import { AbstractUsersUiFacade } from '../abstract-users-ui.facade';
import { IRegisterState } from '../../../../../shared/models/register-state.interface';

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

  abstract register(data: IUserData): void;
}
