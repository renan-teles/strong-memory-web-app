import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthFormRole } from '../../forms/auth-user-form/auth-form-role.type';
import { AuthUserFormComponent } from '../../forms/auth-user-form/auth-user-form.component';
import { UserRequest } from '../../../../../users/data/dto/request/user-request';
import { StrongMemoryBrandComponent } from '../../../../../../shared/ui/components/strong-memory-brand/strong-memory-brand.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth-user-form-card',
  imports: [AuthUserFormComponent, StrongMemoryBrandComponent, RouterLink],
  templateUrl: './auth-user-form-card.component.html',
  styleUrl: './auth-user-form-card.component.css',
})
export class AuthUserFormCardComponent {
  @Input() formRole: AuthFormRole = 'register-player';
  @Input() isRegisterRole: boolean = true;
  @Input({ required: true }) title: string = '';

  @Output() userData = new EventEmitter<UserRequest>();

  submittedFormData(data: UserRequest) {
    this.userData.emit(data);
  }
}
