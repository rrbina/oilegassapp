import { HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';
import { LoginStatusEmmiterService } from '../services/login-status-emmiter.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthenticationService,
        private loginStatusEmmiterService: LoginStatusEmmiterService) {}
   
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authenticationService.getToken();       

        if(authToken != null) {
            if(this.authenticationService.isTokenExpired()){
                this.loginStatusEmmiterService.emitStatus(false);
            }  
            let x = new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': "Bearer " + authToken
              });
            req = req.clone({               
                headers: x
            });
        }  
        else {
            this.loginStatusEmmiterService.emitStatus(false);
        }            

    return next.handle(req);
  }
}