import { Injectable, Signal, signal } from '@angular/core';
import { shuffle } from '../../../../../shared/utils/array-shuffle.utils';
import { WordResponse } from '../../../../words/data/dto/response/word-response';

@Injectable({
  providedIn: 'root',
})
export class WordsGameService {
  private words: WordResponse[] = [];
  private counter: number = 0;

  private readonly _currentWords = signal<WordResponse[]>([]);
  currentWords: Signal<WordResponse[]> = this._currentWords.asReadonly();

  private readonly _userWords = signal<string[]>([]);
  userWords: Signal<string[]> = this._userWords.asReadonly();

  setWords(words: WordResponse[]): void {
    this.words = words;
  }

  setUserWords(userWords: string[]) {
    this._userWords.set(userWords);
  }

  hasWords(): boolean {
    return this.words.length > 0;
  }

  hasUserWords(): boolean {
    return this.userWords().length > 0;
  }

  isInEnd(): boolean {
    return this.counter >= this.words.length;
  }

  reset(): void {
    this.counter = 0;
    this._currentWords.set([]);
    this._userWords.set([]);
    this.words = shuffle([...this.words]);
  }

  next(): void {
    this.ensureWords();
    if (this.isInEnd()) return;

    this._currentWords.update((cw) => {
      cw.push(this.words[this.counter]);
      return cw;
    });

    this.counter++;
  }

  isCorrect(): boolean {
    if (!this.hasWords() || !this.hasUserWords()) return false;
    if (this.currentWords().length !== this.userWords().length) return false;

    return this.currentWords().every((w, i) => this.equalWords(w.word, this.userWords()[i]));
  }

  compareCurrentWordsAndUserWordsByIndex(index: number): boolean {
    const current = this.currentWords()?.[index];
    const user = this.userWords()?.[index];

    if (!current || !user) return false;
    return this.equalWords(current.word, user);
  }

  private equalWords(fistWord: string, secondWord: string): boolean {
    return fistWord.trim().toLowerCase() === secondWord.trim().toLowerCase();
  }

  private ensureWords(): void {
    if (!this.hasWords()) throw new Error('Palavras não definidas.');
  }
}
