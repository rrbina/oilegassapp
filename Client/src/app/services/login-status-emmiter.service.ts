import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginStatusEmmiterService {
  public emmiter: EventEmitter<string> = new EventEmitter();
  public navBarText: string;
  public isLogged: boolean;

  constructor() { }

  emitStatus(isLogged: boolean): void {
    if(isLogged)
      this.navBarText = 'Logout';
    else
      this.navBarText = 'Login';

    this.isLogged = isLogged;
    this.emmiter.emit(this.navBarText);
  }
}
