import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'desafio-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  create: boolean;
  
  hasErrorName: boolean;
  hasErrorEmail: boolean;
  hasErrorPassword: boolean;
  hasErrorPasswordRetyped: boolean;
  hasErrorFuncao: boolean;
  hasErrorEmpresa: boolean;
  modalRef: BsModalRef;
  formulario: FormGroup;
  user: User;

  constructor(
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
    private modalService: BsModalService
    ) {       
    this.hasErrorName = false;  
    this.hasErrorEmail = false; 
    this.hasErrorPassword = false; 
    this.hasErrorPasswordRetyped = false; 
    this.hasErrorFuncao = false; 
    this.hasErrorEmpresa = false; 

    this.formulario = new FormGroup({
      Name: new FormControl(null, [Validators.required,Validators.minLength(3),Validators.maxLength(27)]),
      Id: new FormControl(null),
      Email: new FormControl(null, [Validators.required,Validators.email]),
      Password: new FormControl(null, [Validators.required,Validators.minLength(4)]),
      PasswordRetyped: new FormControl(null, [Validators.required,Validators.minLength(4)]),
      Empresa: new FormControl(null, [Validators.required,Validators.minLength(1)]),
      Funcao: new FormControl(null, [Validators.required,Validators.minLength(1)]),
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe( (queryParams: any) =>{

      if(queryParams.hasOwnProperty('id'))
      {
        this.create = false;
        this.getUser(queryParams.id);             
      }
      else
      {
        this.create = true;    
        this.formulario.setValue({
          Id: 0,
          Name: null,
          Email: null,
          Password: null,
          PasswordRetyped: null,
          Empresa: null,
          Funcao: null
        });
      }
    });    
  }

  public getUser(id: number) {
    this.userService.getUser(id,this,this.handleError)
    .subscribe(user => {
      this.formulario.setValue({
        Name: user.name,
        Id: user.id,
        Email: user.email,
        Password: null,
        PasswordRetyped: null,
        Empresa: user.empresa,
        Funcao: user.funcao
      });  
    });
  }

  public handleError(message: string, _this: any){
    //_this.mensagem = message;
    //_this.modalRef = _this.modalService.show(_this.template);
    alert(message);
  }

  public onSubscribe(user: User, _this: any){
    _this.router.navigate(['/users']);
  } 

  checkEmailValid(): boolean {
    if(this.formulario.controls.Email.status !== "VALID"){
      this.hasErrorEmail= true;
       return false;
    }
    return true;
  }

  checkNameValid(): boolean {
    if(this.formulario.controls.Name.status !== "VALID"){
      this.hasErrorName= true;
       return false;
    }
    return true;
  }

  checkPasswordValid(): boolean {
    if(this.formulario.controls.Password.status !== "VALID"){
      this.hasErrorPassword = true;
        return false;
    }
    return true;
  }

  checkPasswordRetypedValid(): boolean {
    if(this.formulario.controls.PasswordRetyped.value !== this.formulario.controls.Password.value){
      this.hasErrorPasswordRetyped = true;
      return false;
    }
    return true;
  }

  checkEmpresaValid(): boolean {
    if(this.formulario.controls.Empresa.status !== "VALID"){
      this.hasErrorEmpresa= true;
       return false;
    }
    return true;
  }

  checkFuncaoValid(): boolean {
    if(this.formulario.controls.Funcao.status !== "VALID"){
      this.hasErrorFuncao= true;
       return false;
    }
    return true;
  }

  salvar(): void {
    this.hasErrorName = false;  
    this.hasErrorEmail = false; 
    this.hasErrorPassword = false; 
    this.hasErrorPasswordRetyped = false; 
    this.hasErrorFuncao= false;
    this.hasErrorEmpresa= false;
    
    if(!this.checkNameValid())
      return;

    if(!this.checkEmailValid())
      return;     

    if(this.create){

      if(!this.checkPasswordValid())
        return;

      if(!this.checkPasswordRetypedValid())
        return;

      if(!this.checkEmpresaValid())
        return;

      if(!this.checkFuncaoValid())
        return;

      this.userService.createUser(this.mapUser(),this,this.handleError).subscribe(user => {
        if(user instanceof Array){
          if(user.length == 0)
            return;
        }
        this.router.navigate(['/users'])
      });
    }
    else{      
      this.userService.updateUser(this.mapUser(),
      this,
      this.handleError,
      this.onSubscribe);
    }
  }

  private mapUser(): User {
    let user = new User();

    user.id = this.formulario.value.Id;
    user.name = this.formulario.value.Name;
    user.email = this.formulario.value.Email;
    user.password = this.formulario.value.Password;
    user.empresa = this.formulario.value.Empresa;
    user.funcao = this.formulario.value.Funcao;

    return user;
  }
}
