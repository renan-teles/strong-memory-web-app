import { Component } from '@angular/core';
import { DifficultySelectComponent } from '../../../game/components/forms/selects/difficulty-select/difficulty-select.component';

@Component({
  selector: 'app-registered-words',
  imports: [DifficultySelectComponent],
  templateUrl: './registered-words.page.html',
  styleUrl: './registered-words.page.css',
})
export class RegisteredWordsPage {}
