
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import { User } from '../models/user';
import { catchError } from 'rxjs/operators';
import { AppSettings } from '../models/app-settings';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {   
      
  constructor(
    private httpService: HttpClient,
    private errorHandlerService: ErrorHandlerService) {
  }

  public getUser(id: number,_this: any, callback:(error: string, _this: any) => void): Observable<User> { 
    return this.httpService.get<User>(`${AppSettings.API_URL}/users/${id}`)
    .pipe(
      map(data => new User().deserialize(data),
        catchError( error => {
          this.errorHandlerService.handleError(error,_this, callback);
          return of([]);
        })
      )
    );
  }

  public getAllUsers(_this: any, callback:(error: string, _this: any) => void): Observable<User[]> {   
    return this.httpService.get<User[]>(`${AppSettings.API_URL}/users`)
    .pipe(
      map(data => data.map(data => new User().deserialize(data))),
      catchError( error => {
        this.errorHandlerService.handleError(error,_this, callback);
        return of([]);
      })
    );
  }

  public createUser(user: User,_this: any, callback:(error: string, _this: any) => void): Observable<User> {
    return this.httpService.post<User>(`${AppSettings.API_URL}/users`, user)
    .pipe(
      map(data => new User().deserialize(data),
        catchError( error => {
          this.errorHandlerService.handleError(error,_this, callback);
          return of([]);
        })
      )
    );
  }    

  public updateUser(user: User,
    _this: any
    , callbackError:(error: string, _this: any) => void
    , callbackSubscribe:(user: User, _this: any) => void): void 
    {
    this.httpService.put<User>(`${AppSettings.API_URL}/users/${user.id}`, JSON.stringify(user))
    .subscribe(
      data => {        
        callbackSubscribe(data as User,_this);
      },
      error => {
        this.errorHandlerService.handleError(error,_this, callbackError);
      }
    );
  }

  public deleteUser(id: number,
    _this: any,
     callbackError:(error: string, _this: any) => void,
     callbackSubscribe:(user: User, _this: any) => void): void{
    this.httpService.delete<User>(`${AppSettings.API_URL}/users/${id}`)
    .subscribe(
      data => {        
        callbackSubscribe(data as User,_this);
      },
      error => {
        this.errorHandlerService.handleError(error,_this, callbackError);
      }
    );
  }
}