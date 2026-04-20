import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterWordDifficultyFormComponent } from '../../components/forms/filter-word-difficulty-form/filter-word-difficulty-form.component';
import { AuthStorageService } from '../../../../../core/services/auth-storage/auth-storage.service';
import { WordResponse } from '../../../data/dto/response/word-response';
import { WordRequest } from '../../../data/dto/request/word-request';
import { UpdateWordRequest } from '../../../data/dto/request/update-word-request';
import { WordDifficultyResponse } from '../../../../word-difficulties/data/dto/response/word-difficulty-response';
import { PaginationState } from '../../../../../shared/types/pagination/pagination-state.interface';
import { WordDifficultyService } from '../../../../word-difficulties/presentation/services/word-difficulty/word-difficulty.service';
import { FormWordModalService } from '../../services/modals/form-word/form-word-modal.service';
import { isValidPage } from '../../../../../shared/utils/pagination.utils';
import { SpinnerBorderComponent } from '../../../../../shared/ui/components/spinner-border/spinner-border.component';
import { ConfirmModalService } from '../../../../../shared/services/modals/confirm/confirm-modal.service';
import { LoadWordsPaginationFacade } from '../../state/load-words-pagination/load-words-pagination.facade';
import { CrudWordsFacade } from '../../state/crud/crud-words.facade';
import { WordDifficultyRequest } from '../../../../word-difficulties/data/dto/request/word-difficulty-request';
import { NavPaginationComponent } from '../../../../../shared/ui/components/nav-pagination/nav-pagination.component';
import { NavPaginationOutput } from '../../../../../shared/ui/components/nav-pagination/nav-pagination-output.type';
import { NavPaginationUtils } from '../../../../../shared/types/ui/nav-pagination/nav-pagination-utils.interface';

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
  private readonly facade: LoadWordsPaginationFacade = inject(LoadWordsPaginationFacade);
  private readonly crudFacade: CrudWordsFacade = inject(CrudWordsFacade);
  private readonly authStorage: AuthStorageService = inject(AuthStorageService);
  private readonly formModal: FormWordModalService = inject(FormWordModalService);
  private readonly confirmModal: ConfirmModalService = inject(ConfirmModalService);
  private readonly difficultyService: WordDifficultyService = inject(WordDifficultyService);

  paginationState: Signal<PaginationState<WordResponse>> = this.facade.paginationState;
  pages: Signal<number[]> = this.facade.pages;

  words: Signal<WordResponse[]> = this.facade.words;
  isLoadingWords: Signal<boolean> = this.facade.isLoading;
  loadWordsSuccess: Signal<boolean> = this.facade.success;

  isDeletingWord: Signal<boolean> = this.crudFacade.isDeleting;
  isUpdatingWord: Signal<boolean> = this.crudFacade.isUpdating;
  isRegisteringWord: Signal<boolean> = this.crudFacade.isRegistering;

  disableRegisterBtn: Signal<boolean> = computed(
    () =>
      this.isDeletingWord() ||
      this.isUpdatingWord() ||
      this.isRegisteringWord() ||
      this.isLoadingWords(),
  );

  ngOnInit(): void {
    this.loadWordsByDiffitulty(this.currentDifficulty);
  }

  get isAdministratorRole(): boolean {
    return !this.authStorage.isPlayer();
  }

  get currentDifficulty(): WordDifficultyResponse {
    return this.difficultyService.currentDifficulty!;
  }

  registerWord(): void {
    this.formModal
      .confirm('Cadastrar Palavra')
      .then((data: WordRequest) => this.crudFacade.register(data))
      .catch(() => {});
  }

  updateWord(wordId: number): void {
    const word: WordResponse | undefined = this.facade.findWordById(wordId);
    if (!word) return;

    this.formModal
      .confirm('Editar Palavra', word)
      .then((data: UpdateWordRequest) => this.crudFacade.update(wordId, data))
      .catch(() => {});
  }

  deleteWord(wordId: number): void {
    this.confirmModal
      .confirm('Excluir Palavra', 'Tem certeza que deseja deletar?', 'btn-danger')
      .then(() => this.crudFacade.delete(wordId))
      .catch(() => {});
  }

  loadWordsByDiffitulty(data: WordDifficultyRequest, page: number = 0): void {
    if (!isValidPage(page, this.paginationState().totalPages)) return;

    this.difficultyService.setCurrentDifficultyByName(data.difficulty);
    this.facade.loadByDifficulty(this.currentDifficulty, page);
  }

  onPagination(paginationOutput: NavPaginationOutput) {
    this.loadWordsByDiffitulty(this.currentDifficulty, paginationOutput.page);
  }
}
