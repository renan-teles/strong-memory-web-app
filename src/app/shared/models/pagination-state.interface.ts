import { IPaginationResponse } from './pagination-response.interface';

export interface IPaginationState<T> extends IPaginationResponse<T> {
  isFinding: boolean;
  findSuccess: boolean;
}
