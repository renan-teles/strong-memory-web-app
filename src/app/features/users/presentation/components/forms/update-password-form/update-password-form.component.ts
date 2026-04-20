import {
  Component,
  DestroyRef,
  effect,
  EffectRef,
  EventEmitter,
  inject,
  OnInit,
  Output,
  Signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpdatePasswordForm } from './update-password-form.type';
import { FormUtils } from '../../../../../../shared/types/ui/forms/form-utils.interface';
import { passwordMatchValidator } from '../../../../../../shared/ui/validators/password-math.validator';
import { UpdatePasswordRequest } from '../../../../data/dto/request/update-password-request';
import { SpinnerBorderComponent } from '../../../../../../shared/ui/components/spinner-border/spinner-border.component';
import { CrudPlayerFacade } from '../../../state/player/crud/crud-player.facade';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-update-password-form',
  imports: [ReactiveFormsModule, SpinnerBorderComponent],
  templateUrl: './update-password-form.component.html',
  styleUrl: './update-password-form.component.css',
})
export class UpdatePasswordFormComponent implements OnInit, FormUtils<UpdatePasswordForm> {
  @Output() passwordData = new EventEmitter<UpdatePasswordRequest>();

  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly crudFacade: CrudPlayerFacade = inject(CrudPlayerFacade);

  private readonly resetFormEffect: EffectRef = effect(() => {
    if (this.updatePasswordSuccess() && !this.isUpdatingPassword()) {
      this.form.reset();
      this.crudFacade.resetUpdatePasswordState();
    }
  });

  isUpdatingPassword: Signal<boolean> = this.crudFacade.isUpdatingPassword;
  updatePasswordSuccess: Signal<boolean> = this.crudFacade.updatePasswordSuccess;

  form = this.fb.nonNullable.group<UpdatePasswordForm>({
    currentPassword: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.minLength(7),
    ]),
    newPassword: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(7)]),
    confirmNewPassword: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.minLength(7),
      passwordMatchValidator,
    ]),
  });

  ngOnInit(): void {
    this.form
      .get('newPassword')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.form.get('confirmNewPassword')?.updateValueAndValidity();
      });
  }

  getInput(name: keyof UpdatePasswordForm): any {
    return this.form.get(name);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.passwordData.emit({
      currentPassword: this.form.value.currentPassword!,
      newPassword: this.form.value.newPassword!,
    });
  }
}
