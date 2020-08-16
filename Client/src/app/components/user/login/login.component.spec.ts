import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import {APP_BASE_HREF} from '@angular/common';

import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Injectable } from '@angular/core';

@Injectable()
class StubbedModalService {
  public show(): void { }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        CommonModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule        
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue : '/' },
        { provide: BsModalService, useClass: StubbedModalService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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

  it('criou um form com senha obrigatório', () => {   
    let password = component.formulario.get('Password');
    password.setValue('');
    expect(password.valid).toBeFalsy();
  });
});
