import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AppSettings } from 'src/app/models/app-settings';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { of } from 'rxjs';
import { LoginStatusEmmiterService } from 'src/app/services/login-status-emmiter.service';

@Component({
  selector: 'desafio-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;
  modalRef: BsModalRef;
  template: any;
  mensagem: string;  
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
  })
  }  
  
  constructor(
    private httpClient: HttpClient,
    private modalService: BsModalService,
    private router: Router, 
    private errorHandlerService: ErrorHandlerService,
    private authenticationService: AuthenticationService,
    private loginStatusEmmiterService: LoginStatusEmmiterService) { 
      this.formulario = new FormGroup({      
      Email: new FormControl(null, [Validators.required,Validators.email]),
      Password: new FormControl(null, [Validators.required,Validators.minLength(4)])      
    });
  }

  ngOnInit(): void {    
  } 

  public showError(message: string, _this: any){
    _this.mensagem = message;
    _this.modalRef = _this.modalService.show(_this.template);
  }

  public login(template: any)
  {
    if(this.formulario.controls.Email.status !== "VALID"){
      this.modalRef = this.modalService.show(this.template);
       return;
    }
    if(this.formulario.controls.Password.status !== "VALID"){
      this.modalRef = this.modalService.show(this.template);
       return;
    }

    this.template = template;
    var userData = {email: this.formulario.controls.Email.value, password: this.formulario.controls.Password.value};
    this.mensagem = undefined;
    return this.httpClient.post<any>(`${AppSettings.TOKEN_URL}/token`, JSON.stringify(userData), this.httpOptions)
    .pipe(
      map(data => data),
      catchError( error => {
        this.errorHandlerService.handleError(error,this, this.showError)
        return of([]);
      })
    ).subscribe(token => {
      if(token instanceof Array){
        if(token.length == 0)
          return;
      }
      this.authenticationService.setToken(token);
      this.loginStatusEmmiterService.emitStatus(true);
      this.router.navigate(['/home'])
    });
  } 
}
