import { Component, inject, OnDestroy } from '@angular/core';
import { AlertService } from '../../../../../core/services/alert/alert.service';
import { IUserData } from '../../../../users/models/user-data.interface';
import { AuthUsersUiFacade } from '../../../facades/ui/auth/auth-users-ui.facade';
import { AuthUserFormCardComponent } from '../../../components/cards/auth-user-form-card/auth-user-form-card.component';
@Component({
  selector: 'app-authenticate-player',
  imports: [AuthUserFormCardComponent],
  templateUrl: './authenticate-player.page.html',
  styleUrl: './authenticate-player.page.css',
})
export class AuthenticatePlayerPage implements IAlertUtils, OnDestroy {
  private readonly facade: AuthUsersUiFacade = inject(AuthUsersUiFacade);
  private readonly alertService: AlertService = inject(AlertService);

  ngOnDestroy(): void {
    this.closeAlert();
  }

  closeAlert(): void {
    this.alertService.clear();
  }

  loginPlayer(data: IUserData): void {
    this.facade.authPlayer(data);
  }
}
