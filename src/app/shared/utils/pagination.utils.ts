import { signal, WritableSignal } from '@angular/core';
import { IPaginationState } from '../models/pagination-state.interface';

export function createPaginationStateSignal<T>() {
  return signal<IPaginationState<T>>(getInitialPaginationState<T>());
}

export function clearPaginationStateSignal<T>(
  state: WritableSignal<IPaginationState<T>>,
  isFinding: boolean = false,
) {
  state.set(getInitialPaginationState<T>(isFinding));
}

export function generatePages(total: number): number[] {
  return Array.from({ length: total }, (_, i) => i);
}

function getInitialPaginationState<T>(isFinding: boolean = false): IPaginationState<T> {
  return {
    content: [],
    totalElements: 0,
    totalPages: 0,
    size: 0,
    number: 0,
    first: true,
    last: true,
    numberOfElements: 0,
    empty: true,
    isFinding,
    findSuccess: false,
  };
}
