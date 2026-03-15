import { Component, Input } from '@angular/core';
import { UserFormComponent } from '../../forms/user-form/user-form.component';
import { StrongMemoryBrandComponent } from '../../../../../shared/components/strong-memory-brand/strong-memory-brand.component';

@Component({
  selector: 'app-user-form-card',
  imports: [UserFormComponent, StrongMemoryBrandComponent],
  templateUrl: './user-form-card.component.html',
  styleUrl: './user-form-card.component.css',
})
export class UserFormCardComponent {
  @Input({ required: true }) isRegisterRole: boolean = true;
}
