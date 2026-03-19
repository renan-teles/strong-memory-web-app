import { Component, inject, Signal } from '@angular/core';
import { UserFormCardComponent } from '../../components/cards/user-form-card/user-form-card.component';
import { IAlertState } from '../../../../shared/models/alert-state.interface';
import { UsersUiFacade } from '../../facades/ui/users-ui.facade';
import { AlertService } from '../../../../core/services/alerts/alert.service';
import { IUserFormData } from '../../models/user-form-data.interface';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';

@Component({
  selector: 'app-authenticate-player',
  imports: [UserFormCardComponent, AlertComponent],
  templateUrl: './authenticate-player.page.html',
  styleUrl: './authenticate-player.page.css',
})
export class AuthenticatePlayerPage implements IAlertUtils {
  private readonly ui = inject(UsersUiFacade);

  private readonly alertService = inject(AlertService);
  alert: Signal<IAlertState | null> = this.alertService.alert;

  ngOnDestroy(): void {
    this.closeAlert();
  }

  closeAlert(): void {
    this.alertService.clear();
  }

  loginPlayer(data: IUserFormData): void {
    this.ui.loginPlayer(data);
  }
}
