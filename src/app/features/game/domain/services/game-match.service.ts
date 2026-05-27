import { Injectable } from '@angular/core';
import { GameMatchResponse } from '../../data/dto/response/game-match-response';
import { MatchMode } from '../enums/match-mode.enum';
import { WordDifficultyResponse } from '../../../word-difficulties/data/dto/response/word-difficulty-response';
import { DrawnWordResponse } from '../../data/dto/response/drawn-word-response';
import { MatchRoundStatus } from '../enums/match-round-status.enum';
import { MatchRoundResponse } from '../../data/dto/response/match-round-response';
import { TypedWordResponse } from '../../data/dto/response/typed-word-response';
import { MatchResult } from '../enums/match-result.enum';

@Injectable({
  providedIn: 'root',
})
export class GameMatchService {
  private match: GameMatchResponse | null = null;
  private viewWords: DrawnWordResponse[] = [];

  private drawnWordsCounter: number = 0;
  private roundCouter: number = 0;

  next(): void {
    this.validateMatch();

    if (this.match!.drawnWords.length === 0) {
      throw new Error('A lista de palavras sorteadas não pode estar vazia.');
    }

    if (this.IsInEnd()) return;

    this.roundCouter++;
    const newRound: MatchRoundResponse = {
      status: MatchRoundStatus.NOT_COMPLETED,
      order: this.roundCouter,
      startAt: new Date().toISOString(),
      endAt: '',
      typedWords: [],
    };

    this.match!.rounds.push(newRound);

    this.drawnWordsCounter++;
    const index: number = this.drawnWordsCounter - 1;

    let newWord: DrawnWordResponse | undefined = this.match!.drawnWords[index];
    this.validateDrawnWord(newWord, index);

    newWord.wasShown = true;
    this.viewWords.push(newWord);
  }

  setResults(userWords: string[]): void {
    userWords = userWords.map((w) => w.trim().toLowerCase());

    const length: number = userWords.length;

    if (length === 0) {
      throw new Error('A lista de palavras digitadas pelo o usuário não pode estar vazia.');
    }

    if (length != this.viewWords.length) {
      throw new Error('A lista de palavras digitadas tem tamanho inválido.');
    }

    const roundIndex: number = this.roundCouter - 1;
    const round: MatchRoundResponse = this.getRoundByIndex(roundIndex);

    round.typedWords = userWords.map((uw, i) => {
      const drawnWord: DrawnWordResponse | undefined = this.viewWords[i];
      this.validateDrawnWord(drawnWord, i);

      return {
        orderIndex: i,
        isCorrect: uw === drawnWord.word.word.trim().toLowerCase(),
        typedValue: uw ?? '',
      };
    });

    round.endAt = new Date().toISOString();
    round.status = this.isGameOver() ? MatchRoundStatus.NOT_COMPLETED : MatchRoundStatus.COMPLETED;
  }

  isCorrectByIndex(index: number): boolean {
    this.validateMatch();

    const round: MatchRoundResponse = this.getRoundByIndex(this.roundCouter - 1);

    const typedWord: TypedWordResponse | undefined = round.typedWords[index];
    if (!typedWord) {
      throw new Error(`Palavra digitada não encontrada no índice: ${index}`);
    }

    return typedWord.isCorrect;
  }

  isGameOver(): boolean {
    const round: MatchRoundResponse = this.getRoundByIndex(this.roundCouter - 1);

    const typedWords: TypedWordResponse[] = round.typedWords;
    if (!typedWords) {
      return false;
    }

    return typedWords.some((w) => !w.isCorrect && w.typedValue);
  }

  increaseScore(): void {
    this.validateMatch();

    if (!this.isGameOver()) {
      this.match!.scoreAchieved += 1;
    }
  }

  addMoreDrawnWords(newDrawnWords: DrawnWordResponse[]): void {
    this.validateMatch();

    if (this.isFiniteMode()) {
      throw new Error('Partidas com modo finito não podem ter novas palavras sorteadas.');
    }

    this.match!.drawnWords = [...this.match!.drawnWords, ...newDrawnWords];
  }

  reset(): void {
    this.drawnWordsCounter = 0;
    this.roundCouter = 0;
    this.match = null;
    this.viewWords = [];
  }

  isInDemo(): boolean {
    this.validateMatch();
    return this.match!.isDemo;
  }

  isInfiniteMode(): boolean {
    this.validateMatch();
    return this.match!.mode === MatchMode.INFINITE;
  }

  isFiniteMode(): boolean {
    this.validateMatch();
    return this.match!.mode === MatchMode.FINITE;
  }

  IsInEnd(): boolean {
    this.validateMatch();
    return this.drawnWordsCounter >= this.match!.drawnWords.length;
  }

  hasDrawnWords(): boolean {
    this.validateMatch();
    return this.match!.drawnWords.length > 0;
  }

  setMatch(match: GameMatchResponse): void {
    this.match = match;
  }

  setMatchResult(result: MatchResult): void {
    this.validateMatch();

    if (result === MatchResult.GAVE_UP || result === MatchResult.TIMEOUT) {
      const index: number = this.roundCouter - 1;
      const round: MatchRoundResponse = this.getRoundByIndex(index);

      if (!round.endAt) {
        round.endAt = new Date().toISOString();
      }
    }

    this.match!.result = result;
  }

  getMatchId(): number {
    this.validateMatch();
    return this.match!.id;
  }

  getViewWords(): DrawnWordResponse[] {
    return this.viewWords;
  }

  getDifficultyName(): string {
    this.validateMatch();
    return this.match!.difficulty.name;
  }

  getDrawnWordsCounter(): number {
    return this.drawnWordsCounter;
  }

  getMatchMode(): MatchMode {
    this.validateMatch();
    return this.match!.mode;
  }

  getIncreaseDisplayTime(): number {
    this.validateMatch();
    return this.match!.difficulty.increaseDisplayTimeSeconds;
  }

  getIncreaseTypingTime(): number {
    this.validateMatch();
    return this.match!.difficulty.increaseTypingTimeSeconds;
  }

  getDifficulty(): WordDifficultyResponse {
    this.validateMatch();
    return this.match!.difficulty;
  }

  getMatchData(): GameMatchResponse {
    this.validateMatch();
    return this.match!;
  }

  getCurrentScore(): number {
    this.validateMatch();
    return this.match!.scoreAchieved;
  }

  private getRoundByIndex(index: number): MatchRoundResponse {
    const round: MatchRoundResponse | undefined = this.match!.rounds[index];
    this.validateRound(round, index);
    return round;
  }

  private validateMatch(): void {
    if (!this.match) {
      throw new Error('Dados da partida não definidos.');
    }
  }

  private validateRound(round: MatchRoundResponse | undefined, index: number): void {
    if (!round) {
      throw new Error(`Rodada não encontrada com índice: ${index}`);
    }
  }

  private validateDrawnWord(drawnWord: DrawnWordResponse | undefined, index: number): void {
    if (!drawnWord) {
      throw new Error(
        `Palavra não encontrada no índice [${index}] da lista de palavras sorteadas.`,
      );
    }
  }
}
