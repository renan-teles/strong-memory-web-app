import { Component, inject } from '@angular/core';
import { AuthUserFormCardComponent } from '../../../components/cards/auth-user-form-card/auth-user-form-card.component';
import { UserRequest } from '../../../../../users/data/dto/request/user-request';
import { parseUserRequestToRegisterUserRequest } from '../../../../../users/data/mappers/user-mapper';
import { RegisterFacade } from '../../../state/register/register.facade';

@Component({
  selector: 'app-register-player',
  imports: [AuthUserFormCardComponent],
  templateUrl: './register-player.page.html',
  styleUrl: './register-player.page.css',
})
export class RegisterPlayerPage {
  private readonly facade: RegisterFacade = inject(RegisterFacade);

  registerPlayer(data: UserRequest): void {
    this.facade.registerPlayer(parseUserRequestToRegisterUserRequest(data));
  }
}
