import { Component, EventEmitter, inject, OnInit, Output, Signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WordComparatorDirective } from '../../../../../../shared/ui/directives/word-comparator.directive';
import { GameFacade } from '../../../state/game/game.facade';
import { WordsComparator } from '../../../../domain/interfaces/words-comparator.interface';
import { GameMatchService } from '../../../../domain/services/game-match.service';

@Component({
  selector: 'app-typing-words-form',
  imports: [ReactiveFormsModule, CommonModule, WordComparatorDirective],
  templateUrl: './typing-words-form.component.html',
  styleUrl: './typing-words-form.component.css',
})
export class TypingWordsFormComponent implements OnInit, WordsComparator {
  @Output() submitWords = new EventEmitter<string[]>();

  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly service: GameMatchService = inject(GameMatchService);
  private readonly facade: GameFacade = inject(GameFacade);

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
    return this.service.isCorrectByIndex(index);
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
    const total: number = this.service.getDrawnWordsCounter();
    this.wordsArray.clear();

    for (let i = 0; i < total; i++) {
      this.wordsArray.push(this.fb.nonNullable.control('', Validators.required));
    }

    this.showButton = true;
  }
}
