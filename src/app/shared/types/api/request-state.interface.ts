import { RequestStatus } from './request-status.type';

export interface RequestState<T> {
  status: RequestStatus;
  data?: T;
}
