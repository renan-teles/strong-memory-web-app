import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BackToTopBtnComponent } from '../../../shared/ui/components/back-to-top-btn/back-to-top-btn.component';
import { ErrorComponent } from '../../../shared/ui/components/error/error.component';
import { LoadingContentComponent } from '../../../shared/ui/components/loading-content/loading-content.component';
import { NavbarComponent } from '../../../shared/ui/components/navbar/navbar.component';
import { ToastComponent } from '../../../shared/ui/components/toast/toast.component';
import { WordDifficultyApiFacade } from '../../../features/word-difficulties/presentation/state/api/word-difficulty-api.facade';
import { WordDifficultyService } from '../../../features/word-difficulties/presentation/services/word-difficulty/word-difficulty.service';
import { FooterComponent } from '../../../shared/ui/components/footer/footer.component';
import { tap } from 'rxjs';
import { ApiResponse } from '../../../shared/types/api/api-response.interface';
import { WordDifficultyResponse } from '../../../features/word-difficulties/data/dto/response/word-difficulty-response';

@Component({
  selector: 'app-main-page-layout',
  imports: [
    NavbarComponent,
    RouterOutlet,
    BackToTopBtnComponent,
    ToastComponent,
    LoadingContentComponent,
    ErrorComponent,
    FooterComponent,
  ],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css',
})
export class AppLayoutComponent implements OnInit {
  private readonly difficultyService: WordDifficultyService = inject(WordDifficultyService);
  private readonly difficultyApiFacade: WordDifficultyApiFacade = inject(WordDifficultyApiFacade);

  isLoadingDifficulties = this.difficultyApiFacade.isLoading;
  loadingDifficultiesSuccess = this.difficultyApiFacade.loadingSuccess;

  ngOnInit(): void {
    this.loadAllDifficulties();
  }

  private loadAllDifficulties(): void {
    if (this.difficultyService.hasDifficulties()) return;

    this.difficultyApiFacade
      .loadAll()
      .pipe(
        tap((response: ApiResponse<WordDifficultyResponse[]>) =>
          this.difficultyService.setDifficulties(response.data!),
        ),
      )
      .subscribe();
  }
}
