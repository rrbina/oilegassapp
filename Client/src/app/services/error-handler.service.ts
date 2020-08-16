import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  public handleError(error: HttpErrorResponse,_this: any, callback: (error: string, _this: any) => void) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      if(error.status === 401){
        errorMessage = `As credenciais fornecidas não foram aceitas.`;
      }
      else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }      
    }    
 
    if(callback !== undefined && _this !== undefined){
      callback(errorMessage,_this);      
      return;
    }
    
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
