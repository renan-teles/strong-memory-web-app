import { Component, inject } from '@angular/core';
import { UserFormCardComponent } from '../../components/cards/user-form-card/user-form-card.component';
import { IUserData } from '../../models/user-data.interface';
import { CrudAdministratorUiFacade } from '../../facades/ui/crud/administrator/crud-administrator-ui.facade';

@Component({
  selector: 'app-register-administrator.page',
  imports: [UserFormCardComponent],
  templateUrl: './register-administrator.page.html',
  styleUrl: './register-administrator.page.css',
})
export class RegisterAdministratorPage {
  private readonly facade: CrudAdministratorUiFacade = inject(CrudAdministratorUiFacade);

  registerAdministrator(data: IUserData): void {
    this.facade.register(data);
  }
}
