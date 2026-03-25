import { Component, inject, OnInit, Signal } from '@angular/core';
import { SpinnerBorderComponent } from '../../../../shared/components/spinner-border/spinner-border.component';
import { TitleCasePipe } from '@angular/common';
import { TranslateDifficultyPipe } from '../../../../shared/pipes/translate-difficulty.pipe';
import { LoadWordsPaginationUiFacade } from '../../facades/ui/load-words-pagination/load-words-pagination-ui.facade';
import { IWordData } from '../../models/word-data.interface';
import { IPaginationState } from '../../../../shared/models/pagination-state.interface';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterWordDifficultyFormComponent } from '../../components/forms/filtert-word-difficulty-form/filter-word-difficulty-form.component';
import { IWordDifficultyFormData } from '../../../../shared/models/word-difficulty-form-data.interface';

@Component({
  selector: 'app-registered-words',
  imports: [
    FilterWordDifficultyFormComponent,
    SpinnerBorderComponent,
    TitleCasePipe,
    TranslateDifficultyPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './registered-words.page.html',
  styleUrl: './registered-words.page.css',
})
export class RegisteredWordsPage implements OnInit {
  private readonly facade: LoadWordsPaginationUiFacade = inject(LoadWordsPaginationUiFacade);

  paginationState: Signal<IPaginationState<IWordData>> = this.facade.paginationState;
  pages: Signal<number[]> = this.facade.pages;
  words: Signal<IWordData[]> = this.facade.words;
  isLoadingWords: Signal<boolean> = this.facade.isLoading;
  loadWordsSuccess: Signal<boolean> = this.facade.success;

  selectedDifficulty: IWordDifficultyFormData = { difficulty: 'easy' };

  ngOnInit(): void {
    this.loadWordsByDiffitulty(this.selectedDifficulty);
  }

  loadWordsByDiffitulty(data: IWordDifficultyFormData, page: number = 0): void {
    if (page !== 0 && (page < 0 || page >= this.paginationState().totalPages)) return;

    if (this.selectedDifficulty.difficulty !== data.difficulty) {
      this.selectedDifficulty = data;
    }

    this.facade.loadByDifficulty(this.selectedDifficulty, page);
  }
}
