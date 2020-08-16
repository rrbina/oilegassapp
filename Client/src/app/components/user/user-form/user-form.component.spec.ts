import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormComponent } from './user-form.component';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFormComponent ]
      ,
      imports: [
        CommonModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule        
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
    .compileComponents();
  })); 

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('criou um form com email e senha', () => {
    expect(component.formulario.contains('Email')).toBeTruthy();
    expect(component.formulario.contains('Password')).toBeTruthy();
  });

  it('criou um form com email obrigatório', () => {
    let email = component.formulario.get('Email');
    email.setValue('');
    expect(email.valid).toBeFalsy();    
  });

  it('criou um form com email válido', () => {
    let email = component.formulario.get('Email');
    email.setValue('eee@gmail.com');
    expect(email.valid).toBeTruthy();    
  });

  it('criou um form com email inválido', () => {
    let email = component.formulario.get('Email');
    email.setValue('eee@');
    expect(component.checkEmailValid()).toBeFalsy();    
  });

  it('criou um form com senha obrigatório', () => {   
    let password = component.formulario.get('Password');
    password.setValue('');
    expect(password.valid).toBeFalsy();
  });

  it('criou um form com senha inválida', () => {   
    let password = component.formulario.get('Password');
    password.setValue('123');
    expect(password.valid).toBeFalsy();
  });

  it('criou um form com senha válida', () => {   
    let password = component.formulario.get('Password');
    password.setValue('1234');
    expect(password.valid).toBeTruthy();
  });

  it('criou um form com senha e redigitou corretamente', () => {   
    let password = component.formulario.get('Password');
    password.setValue('1234');
    let password2 = component.formulario.get('PasswordRetyped');
    password2.setValue('1234');
    expect(password.valid).toBeTruthy();
    expect(component.checkPasswordRetypedValid()).toBeTruthy();
  });

  it('criou um form com senha e redigitou errado', () => {   
    let password = component.formulario.get('Password');
    password.setValue('1234');
    let password2 = component.formulario.get('PasswordRetyped');
    password2.setValue('12345');
    expect(password.valid).toBeTruthy();
    expect(component.checkPasswordRetypedValid()).toBeFalsy();
  });

  it('criou um form com senha com ao menos 4 digitos', () => {   
    let password = component.formulario.get('Password');
    password.setValue('123');
    expect(password.valid).toBeFalsy();
  });

  it('criou um form com nome com ao menos 3 digitos', () => {   
    let name = component.formulario.get('Name');
    name.setValue('12');
    expect(name.valid).toBeFalsy();
  });

  it('criou um form com nome com até 27 digitos', () => {   
    let name = component.formulario.get('Name');
    name.setValue('123456789012345678901234567890');
    expect(name.valid).toBeFalsy();
  });

  it('criou um form com nome válido', () => {   
    let name = component.formulario.get('Name');
    name.setValue('12345678901');
    expect(name.valid).toBeTruthy();
  });
});
