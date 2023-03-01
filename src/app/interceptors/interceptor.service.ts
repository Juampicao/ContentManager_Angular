import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, throwError } from 'rxjs';
import { MyErrorHandlerService } from '../error/service/my-error-handler.service';
import { CustomLogger } from '../utils/CustomLogger';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(
    private _dialog: MatDialog,
    private _handleError: MyErrorHandlerService,
    private _customLogger: CustomLogger
  ) { }
 
  
  /**
   * Intercepts Htpp Error
   * @param req HttpRequest
   * @param next HttpHandler
   * @returns Observable
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this._customLogger.logDebug("Paso por le interceptor..")
    return next.handle(req).pipe(
      catchError(this.handleHTTPError)
    )
  }

  /**
   * 
   * @param error HTTPErrorResponse
   * @returns Error
   */
  handleHTTPError(error: HttpErrorResponse) {
    return throwError("Error Personalizado")
  }


  handleError(component?: string) {
    this._handleError.customError("Interceptor error", `${component}`, "interceptorError (interceptorService)")
  }

}
