import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserFormAuthenticationService implements CanActivate{

  constructor(private router: Router,
    private authenticationService: AuthenticationService) { }

    public canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot,
       state: RouterStateSnapshot): boolean {   
      let url = state.url; 
      if(url.includes('/user-form?id=')) {             
          if (this.authenticationService.checkAuthentication()) {
            var numbers = url.match(/\d+/g).map(String);            
            var token = this.authenticationService.getToken();
            if(token === null) {
              return false;
            }
            const decoded = jwt_decode(token);   
            let allowed = numbers[0] === decoded['id'];   
            if(!allowed){
              window.alert('Você não está autorizado a ver essa página. Isso somente estando logado como esse usuário, por questões de segurança.');
            }
            return allowed;
          }          
          else {            
            window.alert('Você não está autorizado a ver essa página. Isso somente estando logado como esse usuário, por questões de segurança.');
            this.router.navigate(['/login']);
            return false;
          }
        }       

      return true;
    }  
}
