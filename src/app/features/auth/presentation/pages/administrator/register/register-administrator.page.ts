import { Component, inject } from '@angular/core';
import { AuthUserFormCardComponent } from '../../../components/cards/auth-user-form-card/auth-user-form-card.component';
import { UserRequest } from '../../../../../users/data/dto/request/user-request';
import { parseUserRequestToRegisterUserRequest } from '../../../../../users/data/mappers/user-mapper';
import { RegisterFacade } from '../../../state/register/register.facade';

@Component({
  selector: 'app-register-administrator.page',
  imports: [AuthUserFormCardComponent],
  templateUrl: './register-administrator.page.html',
  styleUrl: './register-administrator.page.css',
})
export class RegisterAdministratorPage {
  private readonly facade: RegisterFacade = inject(RegisterFacade);

  registerAdministrator(data: UserRequest): void {
    this.facade.registerAdministrator(parseUserRequestToRegisterUserRequest(data));
  }
}
