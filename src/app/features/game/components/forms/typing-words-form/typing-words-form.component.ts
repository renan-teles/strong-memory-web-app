import { Component, EventEmitter, inject, OnInit, Output, Signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { WordsGameService } from '../../../services/words-game/words-game.service';
import { WordsGameFacade } from '../../../facades/game/words-game.facade';
import { CommonModule } from '@angular/common';
import { WordComparatorDirective } from '../../../../../shared/directives/word-comparator.directive';
import { IWordsComparator } from '../../../models/words-comparator.interface';

@Component({
  selector: 'app-typing-words-form',
  imports: [ReactiveFormsModule, CommonModule, WordComparatorDirective],
  templateUrl: './typing-words-form.component.html',
  styleUrl: './typing-words-form.component.css',
})
export class TypingWordsFormComponent implements OnInit, IWordsComparator {
  @Output() submitWords = new EventEmitter<string[]>();

  private readonly service: WordsGameService = inject(WordsGameService);
  private readonly facade: WordsGameFacade = inject(WordsGameFacade);
  private readonly fb: FormBuilder = inject(FormBuilder);

  compare: Signal<boolean> = this.facade.showResult;
  showButton: boolean = false;
  form = this.fb.nonNullable.group({
    words: this.fb.nonNullable.array<FormControl<string>>([]),
  });

  get wordsArray(): FormArray<FormControl<string>> {
    return this.form.controls.words;
  }

  ngOnInit(): void {
    this.buildForm();
  }

  getInput(name: string): any {
    return this.form.get(name);
  }

  isEqualsWords(index: number): boolean {
    if (!this.compare()) return false;
    return this.service.compareCurrentWordsAndUserWordsByIndex(index);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.wordsArray.disable();
    this.showButton = false;
    this.submitWords.emit(this.form.getRawValue().words);
  }

  private buildForm(): void {
    const total = this.service.currentWords().length;
    this.wordsArray.clear();

    for (let i = 0; i < total; i++) {
      this.wordsArray.push(this.fb.nonNullable.control('', Validators.required));
    }

    this.showButton = true;
  }
}
