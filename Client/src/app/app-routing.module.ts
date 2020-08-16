import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/user/users/users.component';
import { NoPageFoundComponent } from './components/no-page-found/no-page-found.component';
import { UserFormComponent } from './components/user/user-form/user-form.component';
import { AuthenticationService } from './services/authentication.service';
import { LoginComponent } from './components/user/login/login.component';
import { UserFormAuthenticationService } from './services/user-form-authentication.service';
import { EmbarcacoesComponent } from './components/embarcacoes/embarcacoes/embarcacoes.component';
import { EmbarcacaoFormComponent } from './components/embarcacoes/embarcacoes-form/embarcacao-form.component';
import { EstatisticasComponent } from './components/embarcacoes/estatisticas/estatisticas.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersComponent , canActivate: [AuthenticationService] },  
  { path: 'user-form', component: UserFormComponent, canActivate: [UserFormAuthenticationService] }, 
  { path: 'embarcacoes', component: EmbarcacoesComponent , canActivate: [AuthenticationService] },  
  { path: 'embarcacao-form', component: EmbarcacaoFormComponent, canActivate: [UserFormAuthenticationService] }, 
  { path: 'estatisticas', component: EstatisticasComponent, canActivate: [UserFormAuthenticationService] }, 
  { path: '**', component: NoPageFoundComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }