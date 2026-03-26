import { Component, inject, OnDestroy } from '@angular/core';
import { UserFormCardComponent } from '../../components/cards/user-form-card/user-form-card.component';
import { IUserData } from '../../models/user-data.interface';
import { AuthUsersUiFacade } from '../../facades/ui/auth/auth-users-ui.facade';
import { AlertService } from '../../../../core/services/alert/alert.service';

@Component({
  selector: 'app-authenticate-administrator.page',
  imports: [UserFormCardComponent],
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
