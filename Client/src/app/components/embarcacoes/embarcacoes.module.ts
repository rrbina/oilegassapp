import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmbarcacoesComponent } from './embarcacoes/embarcacoes.component';
import { EstatisticasComponent } from './estatisticas/estatisticas.component';
import { EmbarcacaoFormComponent } from './embarcacoes-form/embarcacao-form.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserFormAuthenticationService } from 'src/app/services/user-form-authentication.service';

@NgModule({
  declarations: [
    EmbarcacoesComponent, 
    EstatisticasComponent, 
    EmbarcacaoFormComponent], 
  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],  
  exports: [
    EmbarcacaoFormComponent,
    EmbarcacoesComponent,
    EstatisticasComponent
  ],
  providers: [
    ErrorHandlerService,
    UserFormAuthenticationService,
    AuthenticationService    
  ]
})
export class EmbarcacoesModule { }
