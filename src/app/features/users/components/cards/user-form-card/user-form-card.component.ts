import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserFormComponent } from '../../forms/user-form/user-form.component';
import { StrongMemoryBrandComponent } from '../../../../../shared/components/strong-memory-brand/strong-memory-brand.component';
import { IUserData } from '../../../models/user-data.interface';
import { UserFormRole } from '../../../types/user-form-role.type';

@Component({
  selector: 'app-user-form-card',
  imports: [UserFormComponent, StrongMemoryBrandComponent],
  templateUrl: './user-form-card.component.html',
  styleUrl: './user-form-card.component.css',
})
export class UserFormCardComponent {
  @Input({ required: true }) formRole: UserFormRole = 'register-player';
  @Input({ required: true }) isRegisterRole: boolean = true;
  @Input({ required: true }) title: string = '';

  @Output() userData = new EventEmitter<IUserData>();

  submittedFormData(data: IUserData) {
    this.userData.emit(data);
  }
}
