import { WritableSignal } from '@angular/core';
import { RequestState } from '../types/api/request-state.interface';
import { RequestStatus } from '../types/api/request-status.type';

export function setRequestState<T>(
  state: WritableSignal<RequestState<T>>,
  status: RequestStatus,
  data: T,
) {
  state.update((s) => ({
    ...s,
    status,
    data,
  }));
}

export function setStatusRequestState<T>(
  state: WritableSignal<RequestState<T>>,
  status: RequestStatus,
) {
  state.update((s) => ({
    ...s,
    status,
  }));
}

export function setDataRequestState<T>(state: WritableSignal<RequestState<T>>, data: T) {
  state.update((s) => ({
    ...s,
    data,
  }));
}
