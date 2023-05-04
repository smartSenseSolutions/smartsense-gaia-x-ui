import { MatSnackBarConfig } from '@angular/material/snack-bar';

// Snackbar Config
export const DEFAULT_SNACK_BAR_CONFIG = new MatSnackBarConfig();
DEFAULT_SNACK_BAR_CONFIG.verticalPosition = 'top';
DEFAULT_SNACK_BAR_CONFIG.horizontalPosition = 'right';
DEFAULT_SNACK_BAR_CONFIG.duration = 4000;
DEFAULT_SNACK_BAR_CONFIG.panelClass = ['white-snackbar'];

export enum DataShareEnum {
  START,
  VP_GENERATE,
  VERIFYING,
  SUCCESS,
  FAILED,
}

export enum PollStatus {
  RequestSent = 'request-sent',
  Done = 'done',
}

export const POLL_INTERVAL = 10000;
export const MAX_POLL_COUNT = 10;
