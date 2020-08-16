import {Injectable} from '@angular/core';

import { CanActivate, Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { LoginStatusEmmiterService } from './login-status-emmiter.service';

export const TOKEN_NAME: string = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements CanActivate {

  constructor(private router: Router,
    private loginStatusEmmiterService: LoginStatusEmmiterService) { 
  }   

  public canActivate(): boolean {   
    if (this.checkAuthentication()) {
      return true;
    }
    //window.alert('Você não está autorizado a ver essa página.');
    this.router.navigate(['/login']);
    return false;
  }

  public checkAuthentication(): boolean {   
    if (!this.isTokenExpired()) {
      this.loginStatusEmmiterService.emitStatus(true);
      return true;
    }    
    this.loginStatusEmmiterService.emitStatus(false);
    return false;
  }

  public getToken() : string
  {
    return localStorage.getItem(TOKEN_NAME);
  }

  public setToken(token: string) {
    localStorage.setItem(TOKEN_NAME, token);
  }

  public logOut() {
    localStorage.removeItem(TOKEN_NAME);
    this.loginStatusEmmiterService.emitStatus(false);
  }

  public getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) 
      return null;

    const date = new Date(0); 
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  public isTokenExpired(): boolean {    
    let token = this.getToken();
    if(!token) 
      return true;

    const date = this.getTokenExpirationDate(token);
    if(date === undefined || date === null) 
      return false;

    return !(date.valueOf() > new Date().valueOf());
  }  
}
