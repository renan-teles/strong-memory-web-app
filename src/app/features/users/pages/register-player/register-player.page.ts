import { Component, inject, Signal } from '@angular/core';
import { UserFormCardComponent } from '../../components/cards/user-form-card/user-form-card.component';
import { IUserFormData } from '../../models/user-form-data.interface';
import { UsersUiFacade } from '../../facades/ui/users-ui.facade';
import { IAlertState } from '../../../../shared/models/alert-state.interface';
import { AlertService } from '../../../../core/services/alerts/alert.service';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';

@Component({
  selector: 'app-register-player',
  imports: [UserFormCardComponent, AlertComponent],
  templateUrl: './register-player.page.html',
  styleUrl: './register-player.page.css',
})
export class RegisterPlayerPage implements IAlertUtils {
  private readonly ui = inject(UsersUiFacade);

  private readonly alertService = inject(AlertService);
  alert: Signal<IAlertState | null> = this.alertService.alert;

  closeAlert(): void {
    this.alertService.clear();
  }

  registerPlayer(data: IUserFormData): void {
    this.ui.registerPlayer(data);
  }
}
