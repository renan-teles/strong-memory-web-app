import { Component, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { UsersUiFacade } from '../../facades/ui/users-ui.facade';
import { IUpdatePasswordFormData } from '../../models/update-password-form-data.interface';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { AlertService } from '../../../../core/services/alerts/alert.service';
import { IAlertState } from '../../../../shared/models/alert-state.interface';
import { UpdatePasswordFormComponent } from '../../components/forms/update-password-form/update-password-form.component';
import { SpinnerBorderComponent } from '../../../../shared/components/spinner-border/spinner-border.component';
import { TranslateDifficultyPipe } from '../../../../shared/pipes/translate-difficulty.pipe';

@Component({
  selector: 'app-player-panel',
  imports: [AlertComponent, UpdatePasswordFormComponent, SpinnerBorderComponent, TranslateDifficultyPipe],
  templateUrl: './player-panel.page.html',
  styleUrl: './player-panel.page.css',
})
export class PlayerPanelPage implements OnInit, IAlertUtils, OnDestroy {
  private readonly ui = inject(UsersUiFacade);
  private readonly alertService = inject(AlertService);

  scoreRecords = this.ui.userScoreRecordState;
  updatePassword = this.ui.updatePasswordState;
  alert: Signal<IAlertState | null> = this.alertService.alert;

  ngOnInit(): void {
    this.ui.getPlayerSocreRecords();
  }

  ngOnDestroy(): void {
    this.closeAlert();
  }

  closeAlert(): void {
    this.alertService.clear();
  }

  updatePlayerPassword(data: IUpdatePasswordFormData): void{
    this.ui.updatePlayerPassword(data);
  }
}
