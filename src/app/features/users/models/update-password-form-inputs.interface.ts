import { IUpdatePasswordFormData } from "./update-password-form-data.interface";

export interface IUpdatePasswordFormInputs extends IUpdatePasswordFormData {
  confirmNewPassword: string;
}
