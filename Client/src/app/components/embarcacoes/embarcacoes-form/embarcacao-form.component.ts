import { Component, OnInit } from '@angular/core';
import { EmbarcacoesService } from '../../../services/embarcacoes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Embarcacao } from '../../../models/embarcacao';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

declare const Pikaday: any;
declare const $: any;

@Component({
  selector: 'desafio-embarcacao-form',
  templateUrl: './embarcacao-form.component.html',
  styleUrls: ['./embarcacao-form.component.css']
})
export class EmbarcacaoFormComponent implements OnInit {

  create: boolean;
  
  hasErrorDataEmbarque: boolean;
  hasErrorDataDesembarque: boolean;
  hasErrorDataInicioFolga: boolean;
  hasErrorDataFimFolga: boolean;
  hasErrorUserId: boolean;
  datepickerEmbarque: any;
  datepickerDesembarque: any;
  datepickerInicioFolga: any;
  datepickerFimFolga: any;
  formulario: FormGroup;
  embarcacao: Embarcacao;
  modalRef: BsModalRef;
  embarcacaoFromService: any
  
  constructor(
    private router: Router,
    private embarcacoesService: EmbarcacoesService,
    private route: ActivatedRoute,
    private modalService: BsModalService
    ) {       
    this.datepickerEmbarque = new Pikaday({ field: document.getElementById('datepickerEmbarque') });
    this.datepickerDesembarque = new Pikaday({ field: document.getElementById('datepickerDesembarque') });
    this.datepickerInicioFolga = new Pikaday({ field: document.getElementById('datepickerInicioFolga') });
    this.datepickerFimFolga = new Pikaday({ field: document.getElementById('datepickerFimFolga') });
    this.hasErrorDataEmbarque = false;  
    this.hasErrorDataDesembarque = false; 
    this.hasErrorUserId = false; 
    this.hasErrorDataInicioFolga = false;
    this.hasErrorDataFimFolga = false;

    this.formulario = new FormGroup({
      Id: new FormControl(null),
      DataEmbarque: new FormControl(null, [Validators.required]),
      DataDesembarque: new FormControl(null, [Validators.required]),
      DataInicioFolga: new FormControl(null, [Validators.required]),
      DataFimFolga: new FormControl(null, [Validators.required]),
      UserId: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe( (queryParams: any) =>{

      if(queryParams.hasOwnProperty('id'))
      {
        this.create = false;
        this.getEmbarcacao(queryParams.id);
      }
      else
      {
        this.create = true;    
        this.formulario.setValue({
          Id: 0,
          DataEmbarque: null,
          DataDesembarque: null,
          DataInicioFolga: null,
          DataFimFolga: null,
          UserId: 0
        });
      }
    });    
  }

  public formatMMDDYYYY(_this: Date){
    return (_this.getMonth() + 1) + 
    "-" +  _this.getDate() +
    "-" +  _this.getFullYear();
  }  

  public getEmbarcacao(id: number) {
    this.embarcacoesService.getEmbarcacao(id,this,this.handleError)
    .subscribe(embarcacao => {
      var dtEmb = new Date(embarcacao.dataEmbarque);
      var emb = this.formatMMDDYYYY(dtEmb);
      var dtDesemb = new Date(embarcacao.dataDesembarque); 
      var desemb = this.formatMMDDYYYY(dtDesemb); 

      var dtInicioFolga = new Date(embarcacao.dataInicioFolga); 
      var inicioFolga = this.formatMMDDYYYY(dtInicioFolga); 
      var dtInicioFolga = new Date(embarcacao.dataFimFolga); 
      var fimFolga = this.formatMMDDYYYY(dtInicioFolga); 
      this.formulario.setValue({
        DataEmbarque: emb,
        DataDesembarque: desemb,
        UserId: embarcacao.userId,
        DataInicioFolga: inicioFolga,
        DataFimFolga: fimFolga,
        Id: embarcacao.id
      });  
    });
  }

  public handleError(message: string, _this: any){
    //_this.mensagem = message;
    //_this.modalRef = _this.modalService.show(_this.template);
    alert(message);
  }

  public onSubscribe(embarcacao: Embarcacao, _this: any){
    _this.router.navigate(['/embarcacoes']);
  } 

  checkDataEmbarqueValid(): boolean {
    //var dtEmbarque = this.formulario.controls.DataEmbarque.value;
    if(this.formulario.controls.DataEmbarque.status !== "VALID"){
      this.hasErrorDataEmbarque= true;
       return false;
    }
    return true;
  }

  checkDataInicioFolgaValid(): boolean {
    if(this.formulario.controls.DataInicioFolga.status !== "VALID"){
      this.hasErrorDataInicioFolga= true;
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
      if(difDias >=0 && difDias <=15) {
        return true;
      } else {
        this.hasErrorDataDesembarque= true;
       return false;
      }
    }
  }

  checkDataFimFolgaValid(): boolean {
    var dtInicioFolga = this.formulario.controls.DataInicioFolga.value;
    var dtFimFolga = this.formulario.controls.DataFimFolga.value;

    if(this.formulario.controls.DataFimFolga.status !== "VALID"){
      this.hasErrorDataFimFolga= true;
       return false;
    }
    else {      
      var difDias = this.getDaysDifference(dtInicioFolga,dtFimFolga);
      if(difDias >=7 && difDias <=15) {
        return true;
      } else {
        this.hasErrorDataFimFolga= true;
       return false;
      }
    }
  }

  checkIntervaloFolgaValid(): boolean {
    var dtInicioFolga = new Date(this.formulario.controls.DataInicioFolga.value);
    var dtFimFolga = new Date(this.formulario.controls.DataFimFolga.value);
    var dtDesembarque = new Date(this.formulario.controls.DataDesembarque.value);
    var dtEmbarque = new Date(this.formulario.controls.DataEmbarque.value);
    
    var folga = this.todasAsDatasNoPeriodo(dtInicioFolga,dtFimFolga);
    var embarque = this.todasAsDatasNoPeriodo(dtEmbarque,dtDesembarque);
    var interception = folga.filter(value => embarque.includes(value))
    var temIntersecao = interception && interception.length>0;
    if(temIntersecao){
      alert('A datas de folga estão conflitando com as datas de embarcação.');
    } 
    return !temIntersecao;
  }

  somarUmDia(data: Date) {
    data.setDate(data.getDate() + 1);
    return data;
}

 todasAsDatasNoPeriodo(datainicio: Date, datatfim: Date) : string[] {
    var ret = [];
    var dataAtual = datainicio;
    while (dataAtual <= datatfim) {
        ret.push(dataAtual.getMonth() + '-' + dataAtual.getDay() + '-' + dataAtual.getFullYear());
        dataAtual = this.somarUmDia(dataAtual);
    }
    return ret;
}

  checkUserIdValid(): boolean {
    if(this.formulario.controls.UserId.status !== "VALID"){
      this.hasErrorUserId = true;
        return false;
    }
    return true;
  }

  Create(achou: boolean, _this: any): void{
    if(!achou){
      _this.hasErrorUserId = true;
      return;
    }

    if(_this.create) {      
      _this.embarcacoesService.createEmbarcacao(_this.mapEmbarcacao(),_this,_this.handleError).subscribe(embarcacao => {
        if(embarcacao instanceof Array){
          if(embarcacao.length == 0)
            return;
        }
        alert("Embarcacção cadastrada com sucesso!");
        _this.router.navigate(['/home']);
      });
    }else {      
      _this.embarcacoesService.updateEmbarcacao(_this.mapEmbarcacao(),
      _this,
      _this.handleError,
      _this.onSubscribe);
    }
  }  

  salvar(): void {
    this.hasErrorUserId = false;  
    this.hasErrorDataDesembarque = false; 
    this.hasErrorDataEmbarque = false;
    
    if(!this.checkUserIdValid())
      return;      
      
    if(!this.checkDataEmbarqueValid())
      return;  

    if(!this.checkDataDesembarqueValid())
      return;

    if(!this.checkDataInicioFolgaValid())
      return;

    if(!this.checkDataFimFolgaValid())
      return;

    if(!this.checkIntervaloFolgaValid())
      return;

      this.embarcacoesService.VerifyUserId(this.mapEmbarcacao(),this,this.handleError,this.Create);
  }

  private getDaysDifference(date1:Date,date2:Date): Number {
    var dt1 = new Date(date1);
    var dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24)) + 1;
  }

  private mapEmbarcacao(): Embarcacao {
    let embarcacao = new Embarcacao();
    var dtDesembarque = this.formulario.controls.DataDesembarque.value;
    var dtEmbarque = this.formulario.controls.DataEmbarque.value;

    var dtInicioFolga = this.formulario.controls.DataInicioFolga.value;
    var dtFimFolga = this.formulario.controls.DataFimFolga.value;
    
    var des = new Date(dtDesembarque);
    var emb = new Date(dtEmbarque);
    var inicio = new Date(dtInicioFolga);
    var fim = new Date(dtFimFolga);

    embarcacao.id = this.formulario.value.Id;
    embarcacao.userId = this.formulario.value.UserId;
    embarcacao.dataEmbarque = emb;
    embarcacao.dataDesembarque = des;
    embarcacao.dataInicioFolga = inicio;
    embarcacao.dataFimFolga = fim;

    return embarcacao;
  }
}
