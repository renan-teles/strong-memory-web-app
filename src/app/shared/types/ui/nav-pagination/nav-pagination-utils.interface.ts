import { NavPaginationOutput } from '../../../ui/components/nav-pagination/nav-pagination-output.type';

export interface NavPaginationUtils {
  onPagination(paginationOutput: NavPaginationOutput): void;
}
