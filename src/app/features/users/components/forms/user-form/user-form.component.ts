import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IUserFormData } from '../../../models/user-form-data.interface';
import { UsersUiFacade } from '../../../facades/ui/users-ui.facade';
import { SpinnerBorderComponent } from '../../../../../shared/components/spinner-border/spinner-border.component';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, SpinnerBorderComponent],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent implements OnInit {
  @Input({ required: true }) isRegisterRole: boolean = true;
  @Output() userData = new EventEmitter<IUserFormData>();

  private readonly ui = inject(UsersUiFacade);
  private readonly fb = inject(FormBuilder);

  registerState = this.ui.registerState;
  loginState = this.ui.loginState;

  form = this.fb.nonNullable.group({
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

  getInput(name: keyof IUserFormData) {
    return this.form.get(name);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data: IUserFormData = {
      username: this.isRegisterRole ? (this.form.value.username ?? '') : undefined,
      email: this.form.value.email!,
      password: this.form.value.password!,
    };

    this.userData.emit(data);
  }
}
