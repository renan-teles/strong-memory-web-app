import { inject } from '@angular/core';
import { UsersFacade } from '../users.facade';
import { AlertService } from '../../../../core/services/alerts/alert.service';
import { Router } from '@angular/router';

export abstract class AbstractUsersUiFacade {
  protected readonly facade: UsersFacade = inject(UsersFacade);
  protected readonly alert: AlertService = inject(AlertService);
  protected readonly router: Router = inject(Router);

  constructor() {}

  protected redirectTo(path: string): void {
    this.router.navigate([path]);
  }
}
