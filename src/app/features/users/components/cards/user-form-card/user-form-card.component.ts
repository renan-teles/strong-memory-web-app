import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { UserFormComponent } from '../../forms/user-form/user-form.component';
import { StrongMemoryBrandComponent } from '../../../../../shared/components/strong-memory-brand/strong-memory-brand.component';
import { IUserFormData } from '../../../models/user-form-data.interface';

@Component({
  selector: 'app-user-form-card',
  imports: [UserFormComponent, StrongMemoryBrandComponent],
  templateUrl: './user-form-card.component.html',
  styleUrl: './user-form-card.component.css',
})
export class UserFormCardComponent {
  @Input({ required: true }) isRegisterRole: boolean = true;
  @Output() userData = new EventEmitter<IUserFormData>();

  submittedFormData(data: IUserFormData) {
    this.userData.emit(data);
  }
}
