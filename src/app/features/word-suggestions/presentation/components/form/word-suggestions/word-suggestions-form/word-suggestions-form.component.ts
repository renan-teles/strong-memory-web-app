import { Component, effect, EffectRef, EventEmitter, inject, Output, Signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { WordSuggestionsForm } from '../word-suggestions-form.type';
import { FormUtils } from '../../../../../../../shared/types/ui/forms/form-utils.interface';
import { SpinnerBorderComponent } from '../../../../../../../shared/ui/components/spinner-border/spinner-border.component';
import { WordDifficultyResponse } from '../../../../../../word-difficulties/data/dto/response/word-difficulty-response';
import { WordDifficultyFacade } from '../../../../../../word-difficulties/presentation/state/word-difficulty.facade';
import { WordSuggestionRequest } from '../../../../../data/dto/request/word-suggestion-request';
import { CrudWordSuggestionsFacade } from '../../../../state/crud/crud-word-suggestions.facade';

@Component({
  selector: 'app-word-suggestions-form',
  imports: [ReactiveFormsModule, SpinnerBorderComponent, TitleCasePipe],
  templateUrl: './word-suggestions-form.component.html',
  styleUrl: './word-suggestions-form.component.css',
})
export class WordSuggestionsFormComponent implements FormUtils<WordSuggestionsForm> {
  @Output() suggestionsData = new EventEmitter<WordSuggestionRequest>();

  private readonly facade: CrudWordSuggestionsFacade = inject(CrudWordSuggestionsFacade);
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly difficultyFacade = inject(WordDifficultyFacade);

  private readonly resetFormEffect: EffectRef = effect(() => {
    if (this.registerSuccess() && !this.isRegisteringWord()) {
      this.form.reset();
      this.facade.resetRegisterState();
    }
  });

  isRegisteringWord: Signal<boolean> = this.facade.isRegistering;
  registerSuccess: Signal<boolean> = this.facade.registerSuccess;

  difficulties: Signal<WordDifficultyResponse[]> = this.difficultyFacade.difficulties;

  form: FormGroup = this.fb.nonNullable.group({
    suggestedWord: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(2)]),
    suggestedDifficulty: this.fb.nonNullable.control('easy', [Validators.required]),
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
      suggestedDifficulty: this.form.value.suggestedDifficulty!,
      suggestedWord: this.form.value.suggestedWord!,
    });
  }
}
