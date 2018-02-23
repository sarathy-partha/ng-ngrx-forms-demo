import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";

@Injectable()

export class UIControlService {
    loadingState = new Subject<boolean>();

    constructor(private snackbar: MatSnackBar) { }

    showMessage(message, action, duration) {
        this.snackbar.open(message, action, {
            duration: duration
        });
    }
}