import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './user-form/user-form.component';
import { UsersComponent } from './users/users.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoginComponent } from './login/login.component';
import { UserFormAuthenticationService } from 'src/app/services/user-form-authentication.service';

@NgModule({
  declarations: [
    UserFormComponent,
    UsersComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule   
  ],  
  exports: [
    UserFormComponent,
    UsersComponent
  ],
  providers: [
    ErrorHandlerService,
    UserFormAuthenticationService,
    AuthenticationService    
  ]
})
export class UserModule { }
