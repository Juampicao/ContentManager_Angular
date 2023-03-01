import { ErrorHandler, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomLogger } from 'src/app/utils/CustomLogger';
import { ErrorComponent } from '../error/error.component';

// interface IMyErrorHandle{
//   errorFunctionNotImplemented(component: string): Error;
// }

@Injectable({
  providedIn: 'root'
})
  

  
export class MyErrorHandlerService implements ErrorHandler{

  constructor(
    private _dialog: MatDialog ,
    private _customLogger: CustomLogger,
  ) {  }

  /**
  * Open alert in app client.
  * @param component 
  */
  private openAlert(component?: string) {
    this._dialog.open(ErrorComponent, {
      data: `Hubo un error en ${component} `
    })
  }
  
  public handleError(error: any): void {
    this._customLogger.logError("Error Global captado automaticamente ",error)
    alert(`Error Global captado automaticamente ${error}`)

    this.openAlert(error);
  }



  /**
   * Call this function to show an alerton appClient and customLogger from the error and console.error()
   * @param error any
   * @param component where is the error. string.
   * @param messageClient to show on the alert message
   */
  public customError(error: any, component: string, messageClient: string) {
    this.openAlert(messageClient)
    this._customLogger.logError(`\nError en ${component}.`, error)
  }

  /**
   * General Alert when function is not implemented yet. 
   * @param message string 
   * @param component name component where is called the function.
   */
  public errorFunctionNotImplemented(component: string)   {
    let message = `Error en ${component}. Función no implementada`
 
    this.openAlert(message);
    
    this._customLogger.logError(message)    

    
  }
}
