import { IUpdatePasswordData } from './update-password-data.interface';

export interface IUpdatePasswordFormInputs extends IUpdatePasswordData {
  confirmNewPassword: string;
}
