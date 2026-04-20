import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BackToTopBtnComponent } from '../../../shared/ui/components/back-to-top-btn/back-to-top-btn.component';
import { ErrorComponent } from '../../../shared/ui/components/error/error.component';
import { LoadingContentComponent } from '../../../shared/ui/components/loading-content/loading-content.component';
import { NavbarComponent } from '../../../shared/ui/components/navbar/navbar.component';
import { ToastComponent } from '../../../shared/ui/components/toast/toast.component';
import { WordDifficultyFacade } from '../../../features/word-difficulties/presentation/state/word-difficulty.facade';
import { WordDifficultyService } from '../../../features/word-difficulties/presentation/services/word-difficulty/word-difficulty.service';

@Component({
  selector: 'app-main-page-layout',
  imports: [
    NavbarComponent,
    RouterOutlet,
    BackToTopBtnComponent,
    ToastComponent,
    LoadingContentComponent,
    ErrorComponent,
  ],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css',
})
export class AppLayoutComponent implements OnInit {
  private readonly difficultyService: WordDifficultyService = inject(WordDifficultyService);
  private readonly difficultyFacade: WordDifficultyFacade = inject(WordDifficultyFacade);

  isLoadingDifficulties = this.difficultyFacade.isLoading;
  loadingDifficultiesSuccess = this.difficultyFacade.loadingSuccess;

  ngOnInit(): void {
    this.difficultyService.loadAll();
  }
}
