import { Component } from '@angular/core';
import { UserFormCardComponent } from '../../../components/cards/user-form-card/user-form-card.component';

@Component({
  selector: 'app-register-player',
  imports: [UserFormCardComponent],
  templateUrl: './register-player.page.html',
  styleUrl: './register-player.page.css',
})
export class RegisterPlayerPage {}
