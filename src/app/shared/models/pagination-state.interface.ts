import { IPaginationResponse } from './pagination-response.interface';

export interface IPaginationState<T> extends IPaginationResponse<T> {
  isLoading: boolean;
  success: boolean;
}
