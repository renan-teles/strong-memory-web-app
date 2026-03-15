import { Component } from '@angular/core';
import { DifficultySelectComponent } from '../../components/forms/selects/difficulty-select/difficulty-select.component';

@Component({
  selector: 'app-start-game',
  imports: [DifficultySelectComponent],
  templateUrl: './start-game.page.html',
  styleUrl: './start-game.page.css',
})
export class StartGamePage {}

