import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatchDifficultyFormComponent } from '../../../../game/presentation/components/forms/match-difficulty/match-difficulty-form.component';
import { MatchDifficultyDataForm } from '../../../../game/presentation/components/forms/match-difficulty/match-difficulty-data-form';
import { ToastService } from '../../../../../shared/services/toast/toast.service';

@Component({
  selector: 'app-home',
  imports: [MatchDifficultyFormComponent, RouterLink],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export class HomePage implements OnInit {
  private readonly router: Router = inject(Router);
  private readonly toast = inject(ToastService);

  ngOnInit() {
    // this.toast.showSuccess('teste', ['teste']);
  }

  redirectToPlayGame(data: MatchDifficultyDataForm): void {
    this.router.navigate([`/game/play`], {
      queryParams: { difficulty: data.difficulty, isInfiniteMode: data.isInfiniteMode },
    });
  }
}
