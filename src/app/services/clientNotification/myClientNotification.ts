import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { MySnackBarComponent } from "src/app/components/snackBar/my-snack-bar/my-snack-bar.component";
import { ErrorComponent } from "src/app/error/error/error.component";


@Injectable({
  providedIn: 'root'
})
    
export class MyClientNotification{
    
    // Cambiar posición del snackBar
    private horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    private verticalPosition: MatSnackBarVerticalPosition = 'top';
    
    
    constructor(
        private _notification: MatSnackBar,
        private _dialog: MatDialog
    ) { }

    /**
     * Show alert dialog on client side.
     * @param component Where is activated this function.
     */
    openAlert(message: string, component?: string) {
    this._dialog.open(ErrorComponent, {
      data: `Hubo un error en ${component}. Mensaje: ${message} `
    })
    }
    

    /**
     * @param message 
     */
    openNotification(message: string) {
        // this._notification.open(message)
        this._notification.openFromComponent(MySnackBarComponent, {
            data: message,
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        })
    }
}