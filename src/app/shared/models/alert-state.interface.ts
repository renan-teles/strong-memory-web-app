export interface IAlertState {
  alertClass: 'alert-success' | 'alert-danger' | 'alert-info' | 'alert-warning';
  alertIcon:
    | 'bi-x-circle-fill'
    | 'bi-check-circle-fill'
    | 'bi-exclamation-triangle-fill'
    | 'bi-info-circle-fill';
  message: string;
}
