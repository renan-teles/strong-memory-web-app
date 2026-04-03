import { signal, WritableSignal } from '@angular/core';
import { IPaginationState } from '../models/pagination-state.interface';

export function createPaginationStateSignal<T>() {
  return signal<IPaginationState<T>>(getInitialPaginationState<T>());
}

export function clearPaginationStateSignal<T>(
  state: WritableSignal<IPaginationState<T>>,
  isLoading: boolean = false,
) {
  state.set(getInitialPaginationState<T>(isLoading));
}

export function generatePages(total: number): number[] {
  return Array.from({ length: total }, (_, i) => i);
}

export function isValidPage(currentPage: number, totalPages: number) {
  return currentPage >= 0 && currentPage <= totalPages;
}

function getInitialPaginationState<T>(isLoading: boolean = false): IPaginationState<T> {
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
    isLoading,
    success: false,
  };
}
