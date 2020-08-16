import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http'

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { UserModule } from './user/user.module';
import { AppRoutingModule } from '../app-routing.module';
import { AppBootstrapModule } from './app-bootstrap/app-bootstrap.module';
import { ErrorHandlerService } from '../services/error-handler.service';
import { AuthenticationService } from '../services/authentication.service';
import { LoginStatusEmmiterService } from '../services/login-status-emmiter.service';
import { AuthInterceptor } from './auth.interceptor';
import { UserFormAuthenticationService } from '../services/user-form-authentication.service';
import { EmbarcacoesModule } from './embarcacoes/embarcacoes.module';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    NoPageFoundComponent
  ],
  imports: [
    CommonModule,    
    AppRoutingModule,
    UserModule,
    EmbarcacoesModule,
    AppBootstrapModule 
  ],
  exports: [
    CommonModule,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    NoPageFoundComponent
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    },
    ErrorHandlerService,
    AuthenticationService,
    UserFormAuthenticationService,
    LoginStatusEmmiterService
  ]
})
export class ComponentsModule { }
