import { Component, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { IUpdatePasswordData } from '../../models/update-password-data.interface';
import { AlertService } from '../../../../core/services/alert/alert.service';
import { UpdatePasswordFormComponent } from '../../components/forms/update-password-form/update-password-form.component';
import { SpinnerBorderComponent } from '../../../../shared/components/spinner-border/spinner-border.component';
import { TranslateDifficultyPipe } from '../../../../shared/pipes/translate-difficulty.pipe';
import { CrudPlayerUiFacade } from '../../facades/ui/crud/player/crud-player-ui.facade';
import { PlayerScoreRecordsUiFacade } from '../../facades/ui/score-records/player-score-records-ui.facade';
import { IUserScoreRecord } from '../../models/user-score-record.interface';

@Component({
  selector: 'app-player-panel',
  imports: [UpdatePasswordFormComponent, SpinnerBorderComponent, TranslateDifficultyPipe],
  templateUrl: './player-panel.page.html',
  styleUrl: './player-panel.page.css',
})
export class PlayerPanelPage implements OnInit, IAlertUtils, OnDestroy {
  private readonly crudFacade: CrudPlayerUiFacade = inject(CrudPlayerUiFacade);
  private readonly scoreFacade: PlayerScoreRecordsUiFacade = inject(PlayerScoreRecordsUiFacade);
  private readonly alertService: AlertService = inject(AlertService);

  userScores: Signal<IUserScoreRecord[]> = this.scoreFacade.scores;
  isLoadingScores: Signal<boolean> = this.scoreFacade.isLoading;
  loadScoresSuccess: Signal<boolean> = this.scoreFacade.loadSuccess;

  ngOnInit(): void {
    this.scoreFacade.loadSocreRecords();
  }

  ngOnDestroy(): void {
    this.closeAlert();
  }

  closeAlert(): void {
    this.alertService.clear();
  }

  updateUserPassword(data: IUpdatePasswordData): void {
    this.crudFacade.updatePassword(data);
  }
}
