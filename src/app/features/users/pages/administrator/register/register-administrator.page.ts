import { Component, inject } from '@angular/core';
import { AuthUserFormCardComponent } from '../../../../auth/components/cards/auth-user-form-card/auth-user-form-card.component';
import { CrudAdministratorUiFacade } from '../../../facades/ui/crud/administrator/crud-administrator-ui.facade';
import { IUserData } from '../../../models/user-data.interface';

@Component({
  selector: 'app-register-administrator.page',
  imports: [AuthUserFormCardComponent],
  templateUrl: './register-administrator.page.html',
  styleUrl: './register-administrator.page.css',
})
export class RegisterAdministratorPage {
  private readonly facade: CrudAdministratorUiFacade = inject(CrudAdministratorUiFacade);

  registerAdministrator(data: IUserData): void {
    this.facade.register(data);
  }
}
