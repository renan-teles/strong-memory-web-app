import {
  Component,
  computed,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  Signal,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IUserData } from '../../../../users/models/user-data.interface';
import { SpinnerBorderComponent } from '../../../../../shared/components/spinner-border/spinner-border.component';
import { IFormUtils } from '../../../../../shared/models/form-utils.interface';
import { CrudPlayerUiFacade } from '../../../../users/facades/ui/crud/player/crud-player-ui.facade';
import { IRedirectFormLink } from '../../../../users/models/redirect-form-link.interface';
import { CrudAdministratorUiFacade } from '../../../../users/facades/ui/crud/administrator/crud-administrator-ui.facade';
import { AuthUserFormRole } from '../../../types/auth-user-form-role.type';
import { AuthUsersUiFacade } from '../../../facades/ui/auth/auth-users-ui.facade';

@Component({
  selector: 'app-auth-user-form',
  imports: [RouterLink, ReactiveFormsModule, SpinnerBorderComponent],
  templateUrl: './auth-user-form.component.html',
  styleUrl: './auth-user-form.component.css',
})
export class AuthUserFormComponent implements OnInit, IFormUtils<IUserData> {
  @Input({ required: true }) formRole: AuthUserFormRole = 'register-player';
  @Input({ required: true }) isRegisterRole: boolean = true;

  @Output() userData = new EventEmitter<IUserData>();

  private readonly crudPlayerFacade: CrudPlayerUiFacade = inject(CrudPlayerUiFacade);
  private readonly crudAdmFacade: CrudAdministratorUiFacade = inject(CrudAdministratorUiFacade);
  private readonly authFacade: AuthUsersUiFacade = inject(AuthUsersUiFacade);
  private readonly fb: FormBuilder = inject(FormBuilder);

  readonly showLinks: Signal<boolean> = computed(
    () => !(this.isRegisteringUser() || this.isAuthenticatingUser()),
  );

  link: Signal<IRedirectFormLink | null> = computed(() => {
    if (!this.showLinks()) return null;

    switch (this.formRole) {
      case 'auth-administrator':
        return {
          text: 'Não tem conta de administrador? Crie sua conta aqui',
          redirectPath: '/register-user/administrator',
        };

      case 'auth-player':
        return {
          text: 'Não tem conta? Crie sua conta aqui',
          redirectPath: '/register-user/player',
        };

      case 'register-administrator':
        return {
          text: 'Já tem conta de administrador? Entre com ela aqui',
          redirectPath: '/auth/administrator/login',
        };

      case 'register-player':
        return { text: 'Já tem conta? Entre com ela aqui.', redirectPath: '/auth/player/login' };

      default:
        return null;
    }
  });

  linkInversorRole: Signal<IRedirectFormLink | null> = computed(() => {
    if (!this.showLinks()) return null;

    switch (this.formRole) {
      case 'auth-administrator':
        return {
          text: 'Entrar como jogador',
          redirectPath: '/auth/player/login',
        };

      case 'auth-player':
        return { text: 'Entrar como administrador', redirectPath: '/auth/administrator/login' };

      case 'register-administrator':
        return {
          text: 'Me registrar como jogador',
          redirectPath: '/register-user/player',
        };

      case 'register-player':
        return {
          text: 'Me registrar como administrador',
          redirectPath: '/register-user/administrator',
        };

      default:
        return null;
    }
  });

  isRegisteringUser: Signal<boolean> = computed(
    () => this.crudPlayerFacade.isRegistering() || this.crudAdmFacade.isRegistering(),
  );

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
