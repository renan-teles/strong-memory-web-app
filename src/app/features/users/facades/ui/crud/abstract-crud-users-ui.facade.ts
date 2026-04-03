import { computed, inject, Signal, signal } from '@angular/core';
import { IUserData } from '../../../models/user-data.interface';
import { IRegisterState } from '../../../../../shared/models/register-state.interface';
import { UsersFacade } from '../../users.facade';
import { AlertService } from '../../../../../core/services/alert/alert.service';
import { Router } from '@angular/router';

export abstract class AbstractCrudUsersUiFacade {
  protected readonly facade: UsersFacade = inject(UsersFacade);
  protected readonly alert: AlertService = inject(AlertService);
  protected readonly router: Router = inject(Router);

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
