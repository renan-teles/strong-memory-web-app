import { Component } from '@angular/core';
import { UserFormCardComponent } from '../../../components/cards/user-form-card/user-form-card.component';

@Component({
  selector: 'app-authenticate-player',
  imports: [UserFormCardComponent],
  templateUrl: './authenticate-player.page.html',
  styleUrl: './authenticate-player.page.css',
})
export class AuthenticatePlayerPage {}
