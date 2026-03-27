import { inject, Injectable } from '@angular/core';
import { WordsFacade } from '../../words.facade';
import { ConfirmModalService } from '../../../../../core/services/modals/confirm/confirm-modal.service';
import { catchError, EMPTY, tap } from 'rxjs';
import { AlertService } from '../../../../../core/services/alert/alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadWordsPaginationUiFacade } from '../load-words-pagination/load-words-pagination-ui.facade';
import { WordDifficultService } from '../../../../../core/services/word-difficult/word-difficult.service';
import { FormWordModalService } from '../../../services/modals/form-word/form-word-modal.service';
import { IWordData } from '../../../models/word-data.interface';
import { IApiResponse } from '../../../../../shared/models/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class CrudWordsUiFacade {
  private readonly facade: WordsFacade = inject(WordsFacade);
  private readonly confirmService: ConfirmModalService = inject(ConfirmModalService);
  private readonly formWordModalService: FormWordModalService = inject(FormWordModalService);
  private readonly alertService: AlertService = inject(AlertService);
  private readonly paginationWordsFacade: LoadWordsPaginationUiFacade = inject(
    LoadWordsPaginationUiFacade,
  );
  private readonly difficultyService: WordDifficultService = inject(WordDifficultService);
  private readonly loadWordsPagination: LoadWordsPaginationUiFacade = inject(
    LoadWordsPaginationUiFacade,
  );

  register(): void {
    this.formWordModalService
      .confirm('Cadastrar Palavra')
      .then((data: IWordData) => {
        this.facade
          .register(data)
          .pipe(
            tap((response: IApiResponse<IWordData>) => {
              this.alertService.success(response.message);
              this.realoadWords();
            }),
            catchError((error: HttpErrorResponse) => {
              this.alertService.error(error.error.message);
              return EMPTY;
            }),
          )
          .subscribe();
      })
      .catch(() => {});
  }

  update(wordId: number): void {
    const word: IWordData | null | undefined = this.loadWordsPagination
      .words()
      .find((w) => w.id! === wordId);

    if (!word) return;

    this.formWordModalService
      .confirm('Editar Palavra', word)
      .then((data: IWordData) => {
        this.facade
          .update(wordId, data)
          .pipe(
            tap(() => {
              this.alertService.success('Palavra editada com sucesso.');
              this.realoadWords();
            }),
            catchError((error: HttpErrorResponse) => {
              this.alertService.error(error.error.message);
              return EMPTY;
            }),
          )
          .subscribe();
      })
      .catch(() => {});
  }

  delete(wordId: number): void {
    this.confirmService
      .confirm('Excluir Palavra', 'Tem certeza que deseja deletar?', 'btn-danger')
      .then(() => {
        this.facade
          .delete(wordId)
          .pipe(
            tap(() => {
              this.alertService.success('Palavra deletada com sucesso.');
              this.realoadWords();
            }),
            catchError((error: HttpErrorResponse) => {
              this.alertService.success(error.error.message);
              return EMPTY;
            }),
          )
          .subscribe();
      })
      .catch(() => {});
  }

  private realoadWords(): void {
    this.paginationWordsFacade.loadByDifficulty(this.difficultyService.currentDifficulty, 0);
  }
}
