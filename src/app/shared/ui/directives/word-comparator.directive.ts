import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appWordComparator]',
  standalone: true,
})
export class WordComparatorDirective {
  @Input() compare = false;
  @Input() isEquals = false;

  @HostBinding('class.game-app-input-success')
  get valid() {
    return this.compare && this.isEquals;
  }

  @HostBinding('class.game-app-input-error')
  get invalid() {
    return this.compare && !this.isEquals;
  }
}
