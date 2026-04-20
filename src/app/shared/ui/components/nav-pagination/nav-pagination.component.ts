import { Component, EventEmitter, input, Output } from '@angular/core';
import { PaginationState } from '../../../types/pagination/pagination-state.interface';
import { NavPaginationOutput } from './nav-pagination-output.type';

@Component({
  selector: 'app-nav-pagination',
  imports: [],
  templateUrl: './nav-pagination.component.html',
  styleUrl: './nav-pagination.component.css',
})
export class NavPaginationComponent {
  paginationState = input.required<PaginationState<any>>();
  pages = input.required<number[]>();

  @Output() action = new EventEmitter<NavPaginationOutput>();

  back(): void {
    this.setOutput(this.paginationState().number - 1);
  }

  next(): void {
    this.setOutput(this.paginationState().number + 1);
  }

  move(page: number) {
    this.setOutput(page);
  }

  private setOutput(page: number) {
    this.action.emit({ page });
  }
}
