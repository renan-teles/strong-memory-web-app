import { signal, WritableSignal } from '@angular/core';
import { PaginationState } from '../types/pagination/pagination-state.interface';

export function createPaginationStateSignal<T>() {
  return signal<PaginationState<T>>(getInitialPaginationState<T>());
}

export function clearPaginationStateSignal<T>(state: WritableSignal<PaginationState<T>>) {
  state.set(getInitialPaginationState<T>());
}

export function generatePages(total: number): number[] {
  return Array.from({ length: total }, (_, i) => i);
}

export function isValidPage(currentPage: number, totalPages: number) {
  return currentPage >= 0 && currentPage <= totalPages;
}

function getInitialPaginationState<T>(): PaginationState<T> {
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
    isLoading: false,
    success: false,
  };
}
