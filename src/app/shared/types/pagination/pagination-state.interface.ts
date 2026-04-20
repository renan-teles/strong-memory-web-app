import { PaginationResponse } from './pagination-response.interface';

export interface PaginationState<T> extends PaginationResponse<T> {
  isLoading: boolean;
  success: boolean;
}
