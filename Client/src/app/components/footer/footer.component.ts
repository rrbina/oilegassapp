import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'desafio-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  @Input() visible: boolean;
  
  constructor() { }

  ngOnInit(): void {
  }

}
