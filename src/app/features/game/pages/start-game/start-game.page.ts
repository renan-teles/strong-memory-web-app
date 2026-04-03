import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SelectDifficultyFormComponent } from '../../components/forms/select-difficulty-form/select-difficulty-form.component';
import { IWordDifficultyFormData } from '../../../../shared/models/word-difficulty-form-data.interface';

@Component({
  selector: 'app-start-game',
  imports: [SelectDifficultyFormComponent],
  templateUrl: './start-game.page.html',
  styleUrl: './start-game.page.css',
})
export class StartGamePage {
  private readonly router: Router = inject(Router);

  redirectToPlayGame(data: IWordDifficultyFormData): void {
    this.router.navigate([`/app/game/play`], {
      queryParams: { difficulty: data.difficulty },
    });
  }
}
