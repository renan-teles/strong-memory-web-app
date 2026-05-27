import { Component, effect, EffectRef, EventEmitter, inject, Output, Signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { WordSuggestionsForm } from '../word-suggestions-form.type';
import { FormUtils } from '../../../../../../../shared/types/ui/forms/form-utils.interface';
import { SpinnerBorderComponent } from '../../../../../../../shared/ui/components/spinner-border/spinner-border.component';
import { WordDifficultyResponse } from '../../../../../../word-difficulties/data/dto/response/word-difficulty-response';
import { WordSuggestionRequest } from '../../../../../data/dto/request/word-suggestion-request';
import { CrudWordSuggestionsApiFacade } from '../../../../state/api/crud-word-suggestions-api.facade';
import { WordDifficultyService } from '../../../../../../word-difficulties/presentation/services/word-difficulty/word-difficulty.service';

@Component({
  selector: 'app-word-suggestions-form',
  imports: [ReactiveFormsModule, SpinnerBorderComponent, TitleCasePipe],
  templateUrl: './word-suggestions-form.component.html',
  styleUrl: './word-suggestions-form.component.css',
})
export class WordSuggestionsFormComponent implements FormUtils<WordSuggestionsForm> {
  @Output() suggestionsData = new EventEmitter<WordSuggestionRequest>();

  private readonly facade: CrudWordSuggestionsApiFacade = inject(CrudWordSuggestionsApiFacade);
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly difficultyService: WordDifficultyService = inject(WordDifficultyService);

  private readonly resetFormEffect: EffectRef = effect(() => {
    if (this.registerSuccess() && !this.isRegisteringWord()) {
      this.form.reset();
      this.facade.resetRegisterState();
    }
  });

  isRegisteringWord: Signal<boolean> = this.facade.isRegistering;
  registerSuccess: Signal<boolean> = this.facade.registerSuccess;

  get difficulties(): WordDifficultyResponse[] {
    return this.difficultyService.difficulties;
  }

  form: FormGroup = this.fb.nonNullable.group({
    suggestedWord: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(2)]),
    suggestedDifficulty: this.fb.nonNullable.control(
      WordDifficultyService.INITIAL_DIFFICULTY_NAME,
      [Validators.required],
    ),
  });

  getInput(name: keyof WordSuggestionsForm): any {
    return this.form.get(name);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.suggestionsData.emit({
      difficulty: this.form.value.suggestedDifficulty!,
      word: this.form.value.suggestedWord!,
    });
  }
}
