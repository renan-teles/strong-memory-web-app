import { Component } from '@angular/core';
import { DifficultySelectComponent } from '../../../game/components/forms/selects/difficulty-select/difficulty-select.component';

@Component({
  selector: 'app-word-suggestion',
  imports: [DifficultySelectComponent],
  templateUrl: './word-suggestion.page.html',
  styleUrl: './word-suggestion.page.css',
})
export class WordSuggestionPage {}
