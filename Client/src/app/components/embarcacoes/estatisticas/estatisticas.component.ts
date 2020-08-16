import { Component, OnInit } from '@angular/core';
import { Estatistica } from 'src/app/models/estatistica';
import {Chart} from 'chart.js';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstatisticaService } from 'src/app/services/estatistica.service';

declare const Pikaday: any;
declare const $: any;

@Component({
  selector: 'desafio-estatisticas',
  templateUrl: './estatisticas.component.html',
  styleUrls: ['./estatisticas.component.css']
})
export class EstatisticasComponent implements OnInit {
  
  DoughnutChart=[];
  hasErrorDataEmbarque: boolean;
  hasErrorDataDesembarque: boolean;
  datepickerEmbarque: any;
  datepickerDesembarque: any;
  formulario: FormGroup;
  veioDoFiltro: boolean;

  constructor(private router: Router,
    private estatisticaService: EstatisticaService,
    private route: ActivatedRoute) { 
    this.datepickerEmbarque = new Pikaday({ field: document.getElementById('datepickerEmbarque') });
    this.datepickerDesembarque = new Pikaday({ field: document.getElementById('datepickerDesembarque') });
    this.formulario = new FormGroup({
      DataEmbarque: new FormControl(null, [Validators.required]),
      DataDesembarque: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe( (queryParams: any) =>{

      this.route
      .queryParams
      .subscribe(params => {
        var json = params['filtro'];        
        if(json) {
          this.veioDoFiltro = false; 
          var obj = JSON.parse(json);
          var dtEmb = obj.dataInicio;
          var dtDesemb = obj.dataFim;
          this.getEstatistica(dtEmb,dtDesemb);
          this.formulario.setValue({
            DataEmbarque: dtEmb,
            DataDesembarque: dtDesemb,
          });
        }
        else {
          this.veioDoFiltro = true;    
          this.formulario.setValue({
            DataEmbarque: null,
            DataDesembarque: null,
          });
        }
      });


      
    });    
  }
  convertToRGB(_this: string){
    var aRgbHex = _this.match(/.{1,2}/g);
    var aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
    ];
    return aRgb;
}
  montarGrafico(estatistica: Estatistica): void {
    Chart.defaults.global.defaultFontColor = "#fff";
    var cores = [];
    for(var i=0; i<estatistica.empresas.length;i++) {
      var randomColor = Math.floor(Math.random()*16777215).toString(16);
      while(cores.includes(randomColor)){
        randomColor = Math.floor(Math.random()*16777215).toString(16);
      }      
      var aRgb = this.convertToRGB(randomColor);
      var cor = "rgb(" + aRgb[0] + "," + aRgb[1] + "," +  aRgb[2] + ")";
      cores.push(cor);
    }
    var backgroundColor = 'rgb(34,34,34)'
    var config = {
			type: 'doughnut',
			data: {
				datasets: [{
          data: estatistica.numeroEmbarcados,
          backgroundColor:cores,
          borderColor: backgroundColor,
					label: 'Embarcados'
				}],
				labels: estatistica.empresas
			},
			options: {
        responsive: true,
				legend: {
					position: 'top',
				},
				title: {
					display: true,
					text: 'Empresas'
				},
				animation: {
					animateScale: true,
					animateRotate: true
				}
			}
    };    
    
    this.DoughnutChart = new Chart('doughnutChart', config);
  }

  public getEstatistica(dtEmb: any, dtDesemb: any) {        
    this.estatisticaService.getEstatistica(dtEmb,dtDesemb,this,this.handleError)
    .subscribe(estatistica => {     
      this.montarGrafico(estatistica);
    });
  }

  public handleError(message: string, _this: any){
    //_this.mensagem = message;
    //_this.modalRef = _this.modalService.show(_this.template);
    alert(message);
  }

  /*public onSubscribe(estatistica: Estatistica, _this: any){
    _this.router.navigate(['/estatistica']);
  } */

  checkDataEmbarqueValid(): boolean {
    //var dtEmbarque = this.formulario.controls.DataEmbarque.value;
    if(this.formulario.controls.DataEmbarque.status !== "VALID"){
      this.hasErrorDataEmbarque= true;
       return false;
    }
    return true;
  }

  checkDataDesembarqueValid(): boolean {
    var dtDesembarque = this.formulario.controls.DataDesembarque.value;
    var dtEmbarque = this.formulario.controls.DataEmbarque.value;
    
    if(this.formulario.controls.DataDesembarque.status !== "VALID"){
      this.hasErrorDataDesembarque= true;
       return false;
    }
    else {      
      var difDias = this.getDaysDifference(dtEmbarque,dtDesembarque)
      if(difDias >=0) {
        return true;
      } else {
        this.hasErrorDataDesembarque= true;
       return false;
      }
    }
  }

  enviar(): void {     
    this.hasErrorDataDesembarque = false; 
    this.hasErrorDataEmbarque = false;
          
    if(!this.checkDataEmbarqueValid())
      return;  

    if(!this.checkDataDesembarqueValid())
      return;
        
    var dtEmb = this.formulario.controls.DataEmbarque.value;
    var dtDesemb = this.formulario.controls.DataDesembarque.value;
    this.getEstatistica(dtEmb,dtDesemb);    
  }

  private getDaysDifference(date1:Date,date2:Date): Number {
    var dt1 = new Date(date1);
    var dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24)) +1;
  }  
}
