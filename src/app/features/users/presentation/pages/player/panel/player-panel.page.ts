import { Component, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { AlertService } from '../../../../../../shared/services/alert/alert.service';
import { UpdatePasswordFormComponent } from '../../../components/forms/update-password-form/update-password-form.component';
import { TitleCasePipe } from '@angular/common';
import { ScoreRecordResponse } from '../../../../data/dto/response/score-record-response';
import { UpdatePasswordRequest } from '../../../../data/dto/request/update-password-request';
import { AlertUtils } from '../../../../../../shared/types/ui/alert/alert-utils.interface';
import { SpinnerBorderComponent } from '../../../../../../shared/ui/components/spinner-border/spinner-border.component';
import { TranslateDifficultyPipe } from '../../../../../../shared/ui/pipes/translate-difficulty.pipe';
import { CrudPlayerFacade } from '../../../state/player/crud/crud-player.facade';
import { ScoreRecordFacade } from '../../../state/player/score-record/score-record.facade';

@Component({
  selector: 'app-player-panel',
  imports: [
    UpdatePasswordFormComponent,
    SpinnerBorderComponent,
    TranslateDifficultyPipe,
    TitleCasePipe,
  ],
  templateUrl: './player-panel.page.html',
  styleUrl: './player-panel.page.css',
})
export class PlayerPanelPage implements OnInit, AlertUtils, OnDestroy {
  private readonly crudFacade: CrudPlayerFacade = inject(CrudPlayerFacade);
  private readonly scoreFacade: ScoreRecordFacade = inject(ScoreRecordFacade);
  private readonly alertService: AlertService = inject(AlertService);

  userScores: Signal<ScoreRecordResponse[]> = this.scoreFacade.scores;
  isLoadingScores: Signal<boolean> = this.scoreFacade.isLoadingScores;
  loadScoresSuccess: Signal<boolean> = this.scoreFacade.loadSuccessScores;

  ngOnInit(): void {
    this.scoreFacade.loadScoreRecords();
  }

  ngOnDestroy(): void {
    this.closeAlert();
  }

  closeAlert(): void {
    this.alertService.clear();
  }

  updateUserPassword(data: UpdatePasswordRequest): void {
    this.crudFacade.updatePassword(data);
  }
}
