import { CanDeactivateFn } from '@angular/router';

export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Promise<boolean>;
}

export const confirmExitGuard: CanDeactivateFn<CanComponentDeactivate> = async (component) => {
  return component.canDeactivate();
};
