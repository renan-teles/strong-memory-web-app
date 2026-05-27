import { computed, Injectable, signal } from '@angular/core';
import { GameUserState } from '../game-user-state.type';

@Injectable({
  providedIn: 'root',
})
export class GameUserFacade {
  private readonly _userState = signal<GameUserState>('no-result');

  readonly userState = this._userState.asReadonly();
  readonly hasUserState = computed(() => this._userState() !== 'no-result');
  readonly isCorrect = computed(() => this._userState() === 'correct');

  setToNoResult(): void {
    this._userState.set('no-result');
  }

  setToCorrect(): void {
    this._userState.set('correct');
  }

  setToWrong(): void {
    this._userState.set('wrong');
  }
}
