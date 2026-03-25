import { Component, inject } from '@angular/core';
import { UserFormCardComponent } from '../../components/cards/user-form-card/user-form-card.component';
import { IUserData } from '../../models/user-data.interface';
import { CrudPlayerUiFacade } from '../../facades/ui/crud/player/crud-player-ui.facade';

@Component({
  selector: 'app-register-player',
  imports: [UserFormCardComponent],
  templateUrl: './register-player.page.html',
  styleUrl: './register-player.page.css',
})
export class RegisterPlayerPage {
  private readonly facade: CrudPlayerUiFacade = inject(CrudPlayerUiFacade);

  registerPlayer(data: IUserData): void {
    this.facade.register(data);
  }
}
