import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { AppBootstrapModule } from './components/app-bootstrap/app-bootstrap.module';
import { ErrorHandlerService } from './services/error-handler.service';
import { AuthenticationService } from './services/authentication.service';
import { UserFormAuthenticationService } from './services/user-form-authentication.service';


@NgModule({
  declarations: [
    AppComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    AppBootstrapModule
  ],
  providers: [
    ErrorHandlerService,
    UserFormAuthenticationService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
