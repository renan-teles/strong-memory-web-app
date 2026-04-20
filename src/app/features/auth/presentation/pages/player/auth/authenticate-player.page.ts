import { Component, inject, OnDestroy } from '@angular/core';
import { AlertService } from '../../../../../../shared/services/alert/alert.service';
import { AuthUserFormCardComponent } from '../../../components/cards/auth-user-form-card/auth-user-form-card.component';
import { UserRequest } from '../../../../../users/data/dto/request/user-request';
import { AlertUtils } from '../../../../../../shared/types/ui/alert/alert-utils.interface';
import { LoginFacade } from '../../../state/login/login.facade';

@Component({
  selector: 'app-authenticate-player',
  imports: [AuthUserFormCardComponent],
  templateUrl: './authenticate-player.page.html',
  styleUrl: './authenticate-player.page.css',
})
export class AuthenticatePlayerPage implements AlertUtils, OnDestroy {
  private readonly facade: LoginFacade = inject(LoginFacade);
  private readonly alertService: AlertService = inject(AlertService);

  ngOnDestroy(): void {
    this.closeAlert();
  }

  closeAlert(): void {
    this.alertService.clear();
  }

  loginPlayer(data: UserRequest): void {
    this.facade.loginPlayer(data);
  }
}
