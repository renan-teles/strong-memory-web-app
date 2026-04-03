import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { BackToTopBtnComponent } from '../../../shared/components/back-to-top-btn/back-to-top-btn.component';
import { ToastComponent } from '../../../shared/components/toast/toast.component';
import { WordDifficultyService } from '../../services/word-difficulty/word-difficulty.service';
import { LoadingContentComponent } from '../../../shared/components/loading-content/loading-content.component';
import { ErrorComponent } from '../../../shared/components/error/error.component';

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
  templateUrl: './main-page-layout.component.html',
  styleUrl: './main-page-layout.component.css',
})
export class MainPageLayoutComponent implements OnInit {
  private readonly difficultyService: WordDifficultyService = inject(WordDifficultyService);

  isLoadingDifficulties = this.difficultyService.isLoading;
  loadingDifficultiesSuccess = this.difficultyService.loadingSuccess;

  ngOnInit(): void {
    this.difficultyService.loadAllDifficulties();
  }
}
