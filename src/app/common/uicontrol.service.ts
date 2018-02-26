import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";

@Injectable()

export class UIControlService {

    constructor(private snackbar: MatSnackBar) { }

    showMessage(message, action, duration) {
        this.snackbar.open(message, action, {
            duration: duration
        });
    }
}