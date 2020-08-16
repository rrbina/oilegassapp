import { Component, OnInit } from '@angular/core';
import { LoginStatusEmmiterService } from 'src/app/services/login-status-emmiter.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'desafio-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  homeSelected: boolean;
  usersSelected: boolean;
  estatisticasSelected: boolean;
  embarcacoesSelected: boolean;
  subscription: any;
  status: string;

  constructor(
    public loginStatusEmmiterService: LoginStatusEmmiterService,
    private authenticationService: AuthenticationService,
    private router: Router
    ) { 
    this.homeSelected = true;
    this.usersSelected = false;
    this.estatisticasSelected = false;
    this.embarcacoesSelected = false;
  }

  ngOnInit(): void {
    if(this.authenticationService.checkAuthentication())
      this.status = 'Logout';
    else
      this.status = 'Login';

    this.subscription = this.loginStatusEmmiterService.emmiter
      .subscribe(item => this.status = item);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  homeClick(): void {
    this.homeSelected = true;
    this.usersSelected = false;
    this.estatisticasSelected = false;
    this.embarcacoesSelected = false;
  }

  usersClick(): void {
    this.homeSelected = false;
    this.usersSelected = true;
    this.estatisticasSelected = false;
    this.embarcacoesSelected = false;
  }

  estatisticasClick(): void {
    this.homeSelected = false;
    this.usersSelected = false;
    this.embarcacoesSelected = false;
    this.estatisticasSelected = true;
  }

  embarcacoesClick(): void {
    this.homeSelected = false;
    this.usersSelected = false;
    this.embarcacoesSelected = true;
    this.estatisticasSelected = false;
  }

  LogarOuDeslogar(): void {
    if(this.loginStatusEmmiterService.isLogged) {
      this.authenticationService.logOut();
    }
    else {
      this.router.navigate(['/login']);
    }      
  }
}
