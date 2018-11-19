import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material';
import { interval } from 'rxjs';

// TODO: Not working as Service

@Injectable()
export class CacheUpdateService {
  constructor(public update: SwUpdate, private snackbar: MatSnackBar) {
    if (update.isEnabled) {
      interval(6 * 60 * 60).subscribe(() =>
        update.checkForUpdate().then(() => console.log('checking for updates'))
      );
    }
    this.update.available.subscribe(event => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);
      const snack = this.snackbar.open(
        'You have an update',
        'Refresh / Reload',
        {
          duration: 6000
        }
      );
      snack.onAction().subscribe(() => {
        window.location.reload();
      });
    });
    this.update.activated.subscribe(event => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });
  }
}
