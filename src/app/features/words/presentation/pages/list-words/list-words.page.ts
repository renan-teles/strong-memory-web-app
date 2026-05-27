import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterWordDifficultyFormComponent } from '../../components/forms/filter-word-difficulty-form/filter-word-difficulty-form.component';
import { WordResponse } from '../../../data/dto/response/word-response';
import { WordRequest } from '../../../data/dto/request/word-request';
import { UpdateWordRequest } from '../../../data/dto/request/update-word-request';
import { WordDifficultyResponse } from '../../../../word-difficulties/data/dto/response/word-difficulty-response';
import { PaginationState } from '../../../../../shared/types/pagination/pagination-state.interface';
import { WordDifficultyService } from '../../../../word-difficulties/presentation/services/word-difficulty/word-difficulty.service';
import { FormWordModalService } from '../../services/modals/form-word/form-word-modal.service';
import { isValidPage } from '../../../../../shared/utils/pagination/pagination.utils';
import { SpinnerBorderComponent } from '../../../../../shared/ui/components/spinner-border/spinner-border.component';
import { ConfirmModalService } from '../../../../../shared/services/modals/confirm/confirm-modal.service';
import { WordDifficultyRequest } from '../../../../word-difficulties/data/dto/request/word-difficulty-request';
import { NavPaginationComponent } from '../../../../../shared/ui/components/nav-pagination/nav-pagination.component';
import { NavPaginationOutput } from '../../../../../shared/ui/components/nav-pagination/nav-pagination-output.type';
import { NavPaginationUtils } from '../../../../../shared/types/ui/nav-pagination/nav-pagination-utils.interface';
import { isObservable, tap } from 'rxjs';
import { LoadWordsPaginationApiFacade } from '../../state/api/load-words-pagination-api.facade';
import { CrudWordsApiFacade } from '../../state/api/crud-words-api.facade';
import { AuthStateService } from '../../../../../core/services/auth/auth-state.service';

@Component({
  selector: 'app-list-words',
  imports: [
    FilterWordDifficultyFormComponent,
    SpinnerBorderComponent,
    TitleCasePipe,
    ReactiveFormsModule,
    NavPaginationComponent,
  ],
  templateUrl: './list-words.page.html',
  styleUrl: './list-words.page.css',
})
export class ListWordsPage implements OnInit, NavPaginationUtils {
  private readonly facadeApi: LoadWordsPaginationApiFacade = inject(LoadWordsPaginationApiFacade);
  private readonly crudApiFacade: CrudWordsApiFacade = inject(CrudWordsApiFacade);
  private readonly authState: AuthStateService = inject(AuthStateService);
  private readonly formModal: FormWordModalService = inject(FormWordModalService);
  private readonly confirmModal: ConfirmModalService = inject(ConfirmModalService);
  private readonly difficultyService: WordDifficultyService = inject(WordDifficultyService);

  paginationState: Signal<PaginationState<WordResponse>> = this.facadeApi.paginationState;
  pages: Signal<number[]> = this.facadeApi.pages;

  words: Signal<WordResponse[]> = this.facadeApi.words;
  isLoadingWords: Signal<boolean> = this.facadeApi.isLoading;
  loadWordsSuccess: Signal<boolean> = this.facadeApi.success;

  isDeletingWord: Signal<boolean> = this.crudApiFacade.isDeleting;
  isUpdatingWord: Signal<boolean> = this.crudApiFacade.isUpdating;
  isRegisteringWord: Signal<boolean> = this.crudApiFacade.isRegistering;

  disableRegisterBtn: Signal<boolean> = computed(
    () =>
      this.isDeletingWord() ||
      this.isUpdatingWord() ||
      this.isRegisteringWord() ||
      this.isLoadingWords(),
  );

  get isAdministratorRole(): boolean {
    return !this.authState.isPlayer();
  }

  get currentDifficulty(): WordDifficultyResponse {
    return this.difficultyService.currentDifficulty!;
  }

  ngOnInit(): void {
    this.onLoadWordsByDiffitulty(this.getDifficultyRequest());
  }

  onRegisterWord(): void {
    this.formModal
      .confirm('Cadastrar Palavra')
      .then((data: WordRequest) => this.registerWord(data))
      .catch(() => {});
  }

  onUpdateWord(wordId: number): void {
    const word: WordResponse | undefined = this.facadeApi.findWordById(wordId);
    if (!word) return;

    this.formModal
      .confirm('Editar Palavra', word)
      .then((data: UpdateWordRequest) => this.updateWord(wordId, data))
      .catch(() => {});
  }

  onDeleteWord(wordId: number): void {
    this.confirmModal
      .confirm('Excluir Palavra', 'Tem certeza que deseja deletar?', 'btn-danger')
      .then(() => this.deleteWord(wordId))
      .catch(() => {});
  }

  onLoadWordsByDiffitulty(data: WordDifficultyRequest, page: number = 0): void {
    if (!isValidPage(page, this.paginationState().totalPages)) return;

    this.difficultyService.setCurrentDifficultyByName(data.difficulty);
    this.facadeApi.loadByDifficulty(this.currentDifficulty, page);
  }

  onPagination(paginationOutput: NavPaginationOutput) {
    this.onLoadWordsByDiffitulty(this.getDifficultyRequest(), paginationOutput.page);
  }

  private registerWord(data: WordRequest) {
    this.reloadData(this.crudApiFacade.register(data, false, true));
  }

  private deleteWord(wordId: number) {
    this.reloadData(this.crudApiFacade.delete(wordId, true));
  }

  private updateWord(wordId: number, data: UpdateWordRequest): void {
    this.reloadData(this.crudApiFacade.update(wordId, data, true));
  }

  private reloadData(obs: any): void {
    if (isObservable(obs)) {
      obs.pipe(tap(() => this.onLoadWordsByDiffitulty(this.getDifficultyRequest()))).subscribe();
    }
  }

  private getDifficultyRequest(): WordDifficultyRequest {
    return { difficulty: this.currentDifficulty.name };
  }
}
