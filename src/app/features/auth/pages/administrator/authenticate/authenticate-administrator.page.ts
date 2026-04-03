import { Component, inject, OnDestroy } from '@angular/core';
import { IUserData } from '../../../../users/models/user-data.interface';
import { AlertService } from '../../../../../core/services/alert/alert.service';
import { AuthUsersUiFacade } from '../../../facades/ui/auth/auth-users-ui.facade';
import { AuthUserFormCardComponent } from '../../../components/cards/auth-user-form-card/auth-user-form-card.component';

@Component({
  selector: 'app-authenticate-administrator',
  imports: [AuthUserFormCardComponent],
  templateUrl: './authenticate-administrator.page.html',
  styleUrl: './authenticate-administrator.page.css',
})
export class AuthenticateAdministratorPage implements IAlertUtils, OnDestroy {
  private readonly facade: AuthUsersUiFacade = inject(AuthUsersUiFacade);
  private readonly alertService: AlertService = inject(AlertService);

  ngOnDestroy(): void {
    this.closeAlert();
  }

  closeAlert(): void {
    this.alertService.clear();
  }

  loginAdministrator(data: IUserData): void {
    this.facade.authAdministrator(data);
  }
}
