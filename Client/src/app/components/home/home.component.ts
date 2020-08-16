import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'desafio-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  clickErro(){
    alert('Verifiquei que o router link estava com problemas, pois através dele os dados da url /embarcacoes não estão vindo. Não houve tempo para resolver o bug...Desculpe. Para trazer os dados deve-se vir pela navbar, no item Embarcações. Não consegui até o momento entender o problemas, pois as outras telas funcionam com o router link corretamente.');
    this.router.navigate(['/embarcacoes']);
  }


}
