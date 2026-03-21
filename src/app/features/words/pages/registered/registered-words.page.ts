import { Component, inject, OnInit, Signal } from '@angular/core';
import { SelectWordDifficultyFormComponent } from '../../components/forms/select-word-difficulty-form/select-word-difficulty-form.component';
import { IWordDifficultyData } from '../../models/word-difficulty-data.interface';
import { SpinnerBorderComponent } from '../../../../shared/components/spinner-border/spinner-border.component';
import { TitleCasePipe } from '@angular/common';
import { TranslateDifficultyPipe } from '../../../../shared/pipes/translate-difficulty.pipe';
import { FindWordsPaginationUiFacade } from '../../facades/ui/find-words-pagination/find-words-pagination-ui.facade';
import { IWordData } from '../../models/word-data.interface';
import { IPaginationState } from '../../../../shared/models/pagination-state.interface';

@Component({
  selector: 'app-registered-words',
  imports: [
    SelectWordDifficultyFormComponent,
    SpinnerBorderComponent,
    TitleCasePipe,
    TranslateDifficultyPipe,
  ],
  templateUrl: './registered-words.page.html',
  styleUrl: './registered-words.page.css',
})
export class RegisteredWordsPage implements OnInit {
  private readonly facade = inject(FindWordsPaginationUiFacade);

  paginationState: Signal<IPaginationState<IWordData>> = this.facade.paginationState;
  pages: Signal<number[]> = this.facade.pages;
  words: Signal<IWordData[]> = this.facade.words;
  isFindingWords: Signal<boolean> = this.facade.isFinding;
  findWordsSuccess: Signal<boolean> = this.facade.findSuccess;

  selectedDifficulty: IWordDifficultyData = { difficulty: 'easy' };

  ngOnInit(): void {
    this.findWordsByDiffitulty(this.selectedDifficulty);
  }

  findWordsByDiffitulty(data: IWordDifficultyData, page: number = 0): void {
    if (page !== 0 && (page < 0 || page >= this.paginationState().totalPages)) return;

    if (this.selectedDifficulty.difficulty !== data.difficulty) {
      this.selectedDifficulty = data;
    }

    this.facade.findByDifficulty(this.selectedDifficulty, page);
  }
}
