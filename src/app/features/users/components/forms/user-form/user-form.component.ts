import { Component, EventEmitter, inject, Input, OnInit, Output, Signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IUserData } from '../../../models/user-data.interface';
import { SpinnerBorderComponent } from '../../../../../shared/components/spinner-border/spinner-border.component';
import { IFormUtils } from '../../../../../shared/models/form-utils.interface';
import { CrudPlayerUiFacade } from '../../../facades/ui/crud/player/crud-player-ui.facade';
import { AuthUsersUiFacade } from '../../../facades/ui/auth/auth-users-ui.facade';

@Component({
  selector: 'app-user-form',
  imports: [RouterLink, ReactiveFormsModule, SpinnerBorderComponent],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent implements OnInit, IFormUtils<IUserData> {
  @Input({ required: true }) isRegisterRole: boolean = true;
  @Output() userData = new EventEmitter<IUserData>();

  private readonly crudFacade: CrudPlayerUiFacade = inject(CrudPlayerUiFacade);
  private readonly authFacade: AuthUsersUiFacade = inject(AuthUsersUiFacade);
  private readonly fb: FormBuilder = inject(FormBuilder);

  isRegisteringUser: Signal<boolean> = this.crudFacade.isRegistering;
  isAuthenticatingUser: Signal<boolean> = this.authFacade.isAuthenticating;

  form: FormGroup = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(7)]],
  });

  ngOnInit(): void {
    if (!this.isRegisterRole) {
      this.form.get('username')?.clearValidators();
      this.form.get('username')?.updateValueAndValidity();
      return;
    }
    this.form.get('username')?.setValidators([Validators.required]);
    this.form.get('username')?.updateValueAndValidity();
  }

  getInput(name: keyof IUserData): any {
    return this.form.get(name);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data: IUserData = {
      username: this.isRegisterRole ? (this.form.value.username ?? '') : undefined,
      email: this.form.value.email!,
      password: this.form.value.password!,
    };

    this.userData.emit(data);
  }
}
