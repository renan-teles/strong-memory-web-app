import { Component, inject, OnDestroy } from '@angular/core';
import { AlertService } from '../../../../../../shared/services/alert/alert.service';
import { UpdatePasswordFormComponent } from '../../../components/forms/update-password-form/update-password-form.component';
import { UpdatePasswordRequest } from '../../../../data/dto/request/update-password-request';
import { AlertUtils } from '../../../../../../shared/types/ui/alert/alert-utils.interface';
import { CrudPlayerApiFacade } from '../../../state/player/api/crud-player-api.facade';

@Component({
  selector: 'app-player-panel',
  imports: [UpdatePasswordFormComponent],
  templateUrl: './player-panel.page.html',
  styleUrl: './player-panel.page.css',
})
export class PlayerPanelPage implements AlertUtils, OnDestroy {
  private readonly crudApi: CrudPlayerApiFacade = inject(CrudPlayerApiFacade);
  private readonly alertService: AlertService = inject(AlertService);

  ngOnDestroy(): void {
    this.closeAlert();
  }

  closeAlert(): void {
    this.alertService.clear();
  }

  updateUserPassword(data: UpdatePasswordRequest): void {
    this.crudApi.updatePassword(data);
  }
}
