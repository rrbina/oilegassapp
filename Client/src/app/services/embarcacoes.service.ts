import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import { Embarcacao } from '../models/embarcacao';
import { catchError } from 'rxjs/operators';
import { AppSettings } from '../models/app-settings';
import { ErrorHandlerService } from './error-handler.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class EmbarcacoesService {   
      
  constructor(
    private httpService: HttpClient,
    public userService: UserService,
    private errorHandlerService: ErrorHandlerService) {
  }

  public getEmbarcacao(id: number,_this: any, callback:(error: string, _this: any) => void): Observable<Embarcacao> { 
    return this.httpService.get<Embarcacao>(`${AppSettings.API_URL}/embarcacao/${id}`)
    .pipe(
      map(data => new Embarcacao().deserialize(data),
        catchError( error => {
          this.errorHandlerService.handleError(error,_this, callback);
          return of([]);
        })
      )
    );
  }  

  public getAllEmbarcacao(_this: any, callback:(error: string, _this: any) => void): Observable<Embarcacao[]> {   
    return this.httpService.get<Embarcacao[]>(`${AppSettings.API_URL}/embarcacao`)
    .pipe(
      map(data => data.map(data => new Embarcacao().deserialize(data))),
      catchError( error => {
        this.errorHandlerService.handleError(error,_this, callback);
        return of([]);
      })
    );
  }

  public VerifyUserId(embarcacao: Embarcacao,_this: any, callbackError:(error: string, _this: any) => void, callback:(_achou: boolean, _this: any) => void): any {
    this.userService.getAllUsers(_this,callbackError).subscribe(users => {
      var achou = false;
      for(var i=0;i<users.length;i++){
        if(users[i].id == embarcacao.userId){
          achou = true;  
          break;       
        }
      }
      callback(achou,_this);
    }); 
  }

  public createEmbarcacao(embarcacao: Embarcacao,_this: any, callback:(error: string, _this: any) => void): any {
    return this.httpService.post<Embarcacao>(`${AppSettings.API_URL}/embarcacao/create`, embarcacao)
    .pipe(
      map(data => new Embarcacao().deserialize(data),
        catchError( error => {
          this.errorHandlerService.handleError(error,_this, callback);
          return of([]);
        })
      )
    );
        
  }
    

  public updateEmbarcacao(embarcacao: Embarcacao,
    _this: any
    , callbackError:(error: string, _this: any) => void
    , callbackSubscribe:(embarcacao: Embarcacao, _this: any) => void): void 
    {
    this.httpService.put<Embarcacao>(`${AppSettings.API_URL}/embarcacao/${embarcacao.id}`, JSON.stringify(embarcacao))
    .subscribe(
      data => {        
        callbackSubscribe(data as Embarcacao,_this);
      },
      error => {
        this.errorHandlerService.handleError(error,_this, callbackError);
      }
    );
  }

  public deleteEmbarcacao(id: number,
    _this: any,
     callbackError:(error: string, _this: any) => void,
     callbackSubscribe:(embarcacao: Embarcacao, _this: any) => void): void{
    this.httpService.delete<Embarcacao>(`${AppSettings.API_URL}/embarcacao/${id}`)
    .subscribe(
      data => {        
        callbackSubscribe(data as Embarcacao,_this);
      },
      error => {
        this.errorHandlerService.handleError(error,_this, callbackError);
      }
    );
  }
}
