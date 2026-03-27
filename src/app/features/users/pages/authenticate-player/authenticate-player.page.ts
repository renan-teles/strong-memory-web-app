import { Component, inject, OnDestroy } from '@angular/core';
import { UserFormCardComponent } from '../../components/cards/user-form-card/user-form-card.component';
import { AlertService } from '../../../../core/services/alert/alert.service';
import { IUserData } from '../../models/user-data.interface';
import { AuthUsersUiFacade } from '../../facades/ui/auth/auth-users-ui.facade';

@Component({
  selector: 'app-authenticate-player',
  imports: [UserFormCardComponent],
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
