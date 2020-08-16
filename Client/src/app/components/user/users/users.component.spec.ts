import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import {APP_BASE_HREF} from '@angular/common';
import {Observable, of, throwError} from 'rxjs';
//import 'rxjs/add/observable/from';

import { UsersComponent } from './users.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Injectable } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Injectable()
class StubbedModalService {
  public show(): void { }
  public hide(): void { }
}

describe('LoginComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersComponent ],
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
        UserService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('tratou erro no serviço', () => {      
    
    let erro: string = "erro";
    let handleError = function(error: string, _this: any){
      expect(error).toBe(erro);
    }    
    
    spyOn(component.userService,'getUser').and.callFake((id,_this,handleError) => {
      throwError(erro);
      return of(new User());
    });

  });

});
