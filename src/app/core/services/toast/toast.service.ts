import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private snackBar = inject(MatSnackBar);

  private defaultConfig: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
    panelClass: ['custom-snackbar']
  };

  success(message: string, duration: number = 3000) {
    this.snackBar.open(message, '✓', {
      ...this.defaultConfig,
      duration,
      panelClass: ['custom-snackbar', 'success-snackbar']
    });
  }

  error(message: string, duration: number = 3000) {
    this.snackBar.open(message, '✕', {
      ...this.defaultConfig,
      duration,
      panelClass: ['custom-snackbar', 'error-snackbar']
    });
  }
}
