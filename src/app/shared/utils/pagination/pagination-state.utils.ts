import { WritableSignal } from '@angular/core';
import { PaginationState } from '../../types/pagination/pagination-state.interface';
import { ApiResponse } from '../../types/api/api-response.interface';

export function setSuccessPaginationState<T>(
  state: WritableSignal<PaginationState<T>>,
  response: ApiResponse<any>,
): void {
  state.update((s) => ({
    ...s,
    ...response.data,
    success: true,
  }));
}

export function setErrorPaginationState<T>(state: WritableSignal<PaginationState<T>>) {
  state.update((s) => ({
    ...s,
    success: false,
  }));
}

export function setFinalizePaginationState<T>(state: WritableSignal<PaginationState<T>>) {
  state.update((s) => ({
    ...s,
    isLoading: false,
  }));
}

export function setLoadingPaginationState<T>(state: WritableSignal<PaginationState<T>>) {
  state.update((s) => ({
    ...s,
    isLoading: true,
  }));
}
