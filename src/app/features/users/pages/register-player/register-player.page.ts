import { Component, inject, Signal } from '@angular/core';
import { UserFormCardComponent } from '../../components/cards/user-form-card/user-form-card.component';
import { IUserData } from '../../models/user-data.interface';
import { IAlertState } from '../../../../shared/models/alert-state.interface';
import { AlertService } from '../../../../core/services/alerts/alert.service';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { CrudPlayerUiFacade } from '../../facades/ui/crud/player/crud-player-ui.facade';

@Component({
  selector: 'app-register-player',
  imports: [UserFormCardComponent, AlertComponent],
  templateUrl: './register-player.page.html',
  styleUrl: './register-player.page.css',
})
export class RegisterPlayerPage implements IAlertUtils {
  private readonly facade: CrudPlayerUiFacade = inject(CrudPlayerUiFacade);

  private readonly alertService: AlertService = inject(AlertService);
  alert: Signal<IAlertState | null> = this.alertService.alert;

  closeAlert(): void {
    this.alertService.clear();
  }

  registerPlayer(data: IUserData): void {
    this.facade.register(data);
  }
}
