import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { MatchMode } from '../../../domain/enums/match-mode.enum';
import { ConfirmModalService } from '../../../../../shared/services/modals/confirm/confirm-modal.service';
import { GameUtilsFacade } from '../game/utils/game-utils.facade';
import { AuthStateService } from '../../../../../core/services/auth/auth-state.service';

@Injectable({
  providedIn: 'root',
})
export class PlayGamePageFacade {
  private readonly currentRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly confirmModal: ConfirmModalService = inject(ConfirmModalService);
  private readonly gameUtils: GameUtilsFacade = inject(GameUtilsFacade);
  private readonly authState: AuthStateService = inject(AuthStateService);

  readonly isValidParam = signal<boolean>(true);

  loadGameData(): void {
    this.currentRoute.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const difficulty = params.get('difficulty');

        if (!difficulty) {
          this.isValidParam.set(false);
          return;
        }

        const isInfiniteMode = params.get('isInfiniteMode');
        if (!isInfiniteMode) {
          this.isValidParam.set(false);
          return;
        }

        const mode: MatchMode = isInfiniteMode === 'true' ? MatchMode.INFINITE : MatchMode.FINITE;

        try {
          this.gameUtils.setParams(difficulty, mode);
        } catch (error) {
          this.isValidParam.set(false);
        }

        this.gameUtils.loadGameData();
        this.isValidParam.set(true);
      });
  }

  async confirmLeave(): Promise<boolean> {
    try {
      if (!this.authState.isAuthenticated()) return true;

      const confirmed: boolean = await this.confirmModal.confirm(
        'Confirmar Desistência',
        'Tem certeza que deseja desistir?',
        'btn-danger',
      );

      if (confirmed) {
        this.gameUtils.gaveUpMatch();
        this.isValidParam.set(true);
      }

      return confirmed;
    } catch {
      return false;
    }
  }
}
