import { Component, inject, Signal } from '@angular/core';
import { UserFormCardComponent } from '../../components/cards/user-form-card/user-form-card.component';
import { IAlertState } from '../../../../shared/models/alert-state.interface';
import { AlertService } from '../../../../core/services/alerts/alert.service';
import { IUserData } from '../../models/user-data.interface';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { AuthUsersUiFacade } from '../../facades/ui/auth/auth-users-ui.facade';

@Component({
  selector: 'app-authenticate-player',
  imports: [UserFormCardComponent, AlertComponent],
  templateUrl: './authenticate-player.page.html',
  styleUrl: './authenticate-player.page.css',
})
export class AuthenticatePlayerPage implements IAlertUtils {
  private readonly facade: AuthUsersUiFacade = inject(AuthUsersUiFacade);

  private readonly alertService: AlertService = inject(AlertService);
  alert: Signal<IAlertState | null> = this.alertService.alert;

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
