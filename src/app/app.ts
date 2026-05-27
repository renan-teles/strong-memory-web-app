import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertComponent } from './shared/ui/components/alert/alert.component';
import { LoginApiFacade } from './features/auth/presentation/state/login/api/login-api.facade';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AlertComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly loginFacade: LoginApiFacade = inject(LoginApiFacade);

  ngOnInit(): void {
    this.loginFacade.restoreSession();
  }
}
