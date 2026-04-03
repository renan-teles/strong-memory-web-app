import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StrongMemoryBrandComponent } from '../../../../../shared/components/strong-memory-brand/strong-memory-brand.component';
import { IUserData } from '../../../../users/models/user-data.interface';
import { AuthUserFormRole } from '../../../types/auth-user-form-role.type';
import { AuthUserFormComponent } from '../../forms/auth-user-form/auth-user-form.component';

@Component({
  selector: 'app-auth-user-form-card',
  imports: [AuthUserFormComponent, StrongMemoryBrandComponent],
  templateUrl: './auth-user-form-card.component.html',
  styleUrl: './auth-user-form-card.component.css',
})
export class AuthUserFormCardComponent {
  @Input({ required: true }) formRole: AuthUserFormRole = 'register-player';
  @Input({ required: true }) isRegisterRole: boolean = true;
  @Input({ required: true }) title: string = '';

  @Output() userData = new EventEmitter<IUserData>();

  submittedFormData(data: IUserData) {
    this.userData.emit(data);
  }
}
