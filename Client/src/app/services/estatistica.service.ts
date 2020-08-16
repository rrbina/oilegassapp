
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import { Estatistica } from '../models/estatistica';
import { catchError } from 'rxjs/operators';
import { AppSettings } from '../models/app-settings';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class EstatisticaService {   
      
  constructor(
    private httpService: HttpClient,
    private errorHandlerService: ErrorHandlerService) {
  }

  public getEstatistica(dtEmb: Date, dtDesemb: Date, _this: any, callback:(error: string, _this: any) => void): Observable<Estatistica> { 
    //var dtEmbarque = new Date(dtEmb); 
    //var dtDesembarque = new Date(dtDesemb);
    return this.httpService.get<Estatistica>(`${AppSettings.API_URL}/estatistica?dtEmbarque=${dtEmb}&dtDesembarque=${dtDesemb}`)
    .pipe(
      map(data => new Estatistica().deserialize(data),
        catchError( error => {
          this.errorHandlerService.handleError(error,_this, callback);
          return of([]);
        })
      )
    );
  }
}