import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { SpinnerBorderComponent } from '../../../../shared/components/spinner-border/spinner-border.component';
import { TitleCasePipe } from '@angular/common';
import { LoadWordsPaginationUiFacade } from '../../facades/ui/load-words-pagination/load-words-pagination-ui.facade';
import { IWordData } from '../../models/word-data.interface';
import { IPaginationState } from '../../../../shared/models/pagination-state.interface';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterWordDifficultyFormComponent } from '../../components/forms/filter-word-difficulty-form/filter-word-difficulty-form.component';
import { IWordDifficultyFormData } from '../../../../shared/models/word-difficulty-form-data.interface';
import { AuthStorageService } from '../../../../core/services/auth-storage/auth-storage.service';
import { CrudWordsUiFacade } from '../../facades/ui/crud/crud-words-ui.facade';
import { FormWordModalService } from '../../services/modals/form-word/form-word-modal.service';
import { ConfirmModalService } from '../../../../core/services/modals/confirm/confirm-modal.service';
import { isValidPage } from '../../../../shared/utils/pagination.utils';
import { IUpdateWordData } from '../../models/update-word-data.interface';
import { WordDifficultyService } from '../../../../core/services/word-difficulty/word-difficulty.service';
import { IWordDifficultyData } from '../../../../shared/models/word-difficulty-data.interface';

@Component({
  selector: 'app-list-words',
  imports: [
    FilterWordDifficultyFormComponent,
    SpinnerBorderComponent,
    TitleCasePipe,
    ReactiveFormsModule,
  ],
  templateUrl: './list-words.page.html',
  styleUrl: './list-words.page.css',
})
export class ListWordsPage implements OnInit {
  private readonly facade: LoadWordsPaginationUiFacade = inject(LoadWordsPaginationUiFacade);
  private readonly crudFacade: CrudWordsUiFacade = inject(CrudWordsUiFacade);
  private readonly authStorage: AuthStorageService = inject(AuthStorageService);
  private readonly formModal: FormWordModalService = inject(FormWordModalService);
  private readonly confirmModal: ConfirmModalService = inject(ConfirmModalService);
  private readonly difficultyService: WordDifficultyService = inject(WordDifficultyService);

  paginationState: Signal<IPaginationState<IWordData>> = this.facade.paginationState;
  pages: Signal<number[]> = this.facade.pages;
  words: Signal<IWordData[]> = this.facade.words;
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

  get currentDifficulty(): IWordDifficultyData {
    return this.difficultyService.currentDifficulty!;
  }

  loadWordsByDiffitulty(data: IWordDifficultyFormData, page: number = 0): void {
    if (!isValidPage(page, this.paginationState().totalPages)) return;

    this.difficultyService.setCurrentDifficultyByName(data.difficulty);
    this.facade.loadByDifficulty(this.currentDifficulty, page);
  }

  registerWord(): void {
    this.formModal
      .confirm('Cadastrar Palavra')
      .then((data: IWordData) => this.crudFacade.register(data))
      .catch(() => {});
  }

  updateWord(wordId: number): void {
    const word: IWordData | undefined = this.facade.findWordById(wordId);
    if (!word) return;

    this.formModal
      .confirm('Editar Palavra', word)
      .then((data: IUpdateWordData) => this.crudFacade.update(wordId, data))
      .catch(() => {});
  }

  deleteWord(wordId: number): void {
    this.confirmModal
      .confirm('Excluir Palavra', 'Tem certeza que deseja deletar?', 'btn-danger')
      .then(() => this.crudFacade.delete(wordId))
      .catch(() => {});
  }
}
