import { Component, OnInit } from '@angular/core';
import { Embarcacao } from '../../../models/embarcacao';
import { EmbarcacoesService } from '../../../services/embarcacoes.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

declare const Pikaday: any;
declare const $: any;

@Component({
  selector: 'desafio-embarcacoes',
  templateUrl: './embarcacoes.component.html'
})
export class EmbarcacoesComponent implements OnInit {

  public selectedEmbarcacao: Embarcacao;
  public embarcacoes: Embarcacao[];
  public embarcacoesFiltro: Embarcacao[];
  public embarcacoesOriginais: Embarcacao[];
  modalRef: BsModalRef;
  formulario: FormGroup;
  hasErrorDataEmbarque: boolean;
  hasErrorDataDesembarque: boolean;
  datepickerEmbarque: any;
  datepickerDesembarque: any;
  
  constructor(public embarcacoesService: EmbarcacoesService, 
    private modalService: BsModalService,
    private router: Router) {
    
    this.datepickerEmbarque = new Pikaday({ field: document.getElementById('datepickerEmbarque') });
    this.datepickerDesembarque = new Pikaday({ field: document.getElementById('datepickerDesembarque') });
    this.formulario = new FormGroup({
      DataEmbarque: new FormControl(null, [Validators.required]),
      DataDesembarque: new FormControl(null, [Validators.required])
    });
    this.hasErrorDataEmbarque = false;
    this.hasErrorDataDesembarque = false;   
    this.embarcacoesFiltro = [];
    this.getAllEmbarcacao(); 
    
  }

  checkDataEmbarqueValid(): boolean {
    var DataEmbarque = $('#datepickerEmbarque').val();
    if(DataEmbarque === ""){
      this.hasErrorDataEmbarque= true;
       return false;
    }
    return true;
  }
  public handleError(message: string, _this: any){    
    window.alert(message);
    _this.modalRef.hide(); 
  }
  checkDataDesembarqueValid(): boolean {
    var dtEmbarque = $('#datepickerEmbarque').val();
    var dtDesembarque = $('#datepickerDesembarque').val();
    
    if(dtDesembarque === ""){
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

  public getEmbarcacao() {
    this.embarcacoesService.getEmbarcacao(this.selectedEmbarcacao.id,this,this.handleError)
    .subscribe(embarcacao => this.selectedEmbarcacao = embarcacao);
  }

  public getAllEmbarcacao() {
    this.embarcacoesService.getAllEmbarcacao(this,this.handleError).subscribe(embarcacoes => {
      this.embarcacoes = embarcacoes;
      this.embarcacoesOriginais = embarcacoes;
    });
  }

  ngOnInit(): void {
    this.formulario.setValue({
      DataEmbarque: null,
      DataDesembarque: null
    });
  }

  openModal(template: any, embarcacao: Embarcacao) {
    this.selectedEmbarcacao = embarcacao;
    this.modalRef = this.modalService.show(template);
  }

  removeEmbarcacao(embarcacao: Embarcacao, _this: any): void {
    var index = -1;
    for(var i=0;i<_this.embarcacoes.length;i++){
      if(_this.embarcacoes[i].id === embarcacao.id){
        index = i;
        break;
      }
    }
    if (index > -1) {
      _this.embarcacoes.splice(index, 1);
    }
  }  

  deletar(): void { 
    this.modalRef.hide();
    this.embarcacoesService.deleteEmbarcacao(this.selectedEmbarcacao.id,
      this,
      this.handleError,
      this.removeEmbarcacao);    
  }
  filtrar(): void {
    this.hasErrorDataDesembarque = false; 
    this.hasErrorDataEmbarque = false;
          
    if(!this.checkDataEmbarqueValid()){
      this.embarcacoes = this.embarcacoesOriginais;
      return;  
    }      

    if(!this.checkDataDesembarqueValid()){
      this.embarcacoes = this.embarcacoesOriginais;
      return;
    }      
    
    this.embarcacoesFiltro = [];
    var dtEmbarque = $('#datepickerEmbarque').val();
    var dtDesembarque = $('#datepickerDesembarque').val();

    var DataEmb = new Date(dtEmbarque);
    var DataDesemb = new Date(dtDesembarque);
    for(var i=0;i<this.embarcacoesOriginais.length;i++) {
      var DataEmbOriginal = new Date(this.embarcacoesOriginais[i].dataEmbarque);
      var DataDesembOriginal = new Date(this.embarcacoesOriginais[i].dataDesembarque);
      var difEmb = this.getDaysDifference(DataEmb,DataEmbOriginal);
      var difDesemb = this.getDaysDifference(DataDesemb,DataDesembOriginal);
      if(difEmb >=0 && difDesemb<=0){
        this.embarcacoesFiltro.push(this.embarcacoesOriginais[i]);
      }        
    }
    this.embarcacoes = this.embarcacoesFiltro;
  }
  estatistica(): void {
    this.hasErrorDataDesembarque = false; 
    this.hasErrorDataEmbarque = false;
          
    if(!this.checkDataEmbarqueValid())
      return;  

    if(!this.checkDataDesembarqueValid())
      return;
    
    var dtEmbarque = $('#datepickerEmbarque').val();
    var dtDesembarque = $('#datepickerDesembarque').val();
    var obj = {dataInicio: dtEmbarque,dataFim: dtDesembarque };
    var json = JSON.stringify(obj);   
    this.router.navigate(['/estatisticas'], { queryParams: {filtro: json } });
  }

  private getDaysDifference(date1:Date,date2:Date): Number {
    var dt1 = new Date(date1);
    var dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24)) + 1;
  }
}
