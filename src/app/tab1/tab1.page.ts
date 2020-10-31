import { Component } from '@angular/core';
import { isNumber } from 'util';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  private linhas: Array<number> = [0,1,2,3,4];
  private botoes: Array<Object> = [];

  private operacao: string = "";
  private resultado: string = "";

  private hOperacoes: Array<string> = [];
  private hResultados: Array<string> = [];

  private view:boolean = false;

  
  constructor() {
    this.botoes[0]=[
      {"value":"%", "class":""},
      {"value":"√", "class":""},
      {"value":"(", "class":""},
      {"value":")", "class":""},
      {"value":"", "class":""}
    ];

    this.botoes[1]=[
      {"value":"7", "class":""},
      {"value":"8", "class":""},
      {"value":"9", "class":""},
      {"value":"/", "class":"light-blue"},
      {"value":"<", "class":"light-blue"}
    ];

    this.botoes[2]=[
      {"value":"4", "class":""},
      {"value":"5", "class":""},
      {"value":"6", "class":""},
      {"value":"*", "class":"light-blue"},
      {"value":"", "class":""}
    ];

    this.botoes[3]=[
      {"value":"1", "class":""},
      {"value":"2", "class":""},
      {"value":"3", "class":""},
      {"value":"-", "class":"light-blue"},
      {"value":"", "class":""}
    ];

    this.botoes[4]=[
      {"value":"0", "class":""},
      {"value":".", "class":""},
      {"value":"", "class":""},
      {"value":"+", "class":"light-blue"},
      {"value":"=", "class":"light-blue"}
    ];
  }

  onClick(value){
    switch (value){
      case "=":
        this.onClickCalculaResultado();
        this.botoes[1][4].value="C";
        break;
      case "<":
        this.onClickApagar();
        break;
      case "C":
        this.resultado = "";
        this.operacao = "";
        this.botoes[1][4].value="<";
        break;
      case "√":
        if(this.resultado !== ""){
          this.operacao = this.resultado;
          this.resultado = "";
        }
        let raiz = Math.sqrt(parseFloat(this.operacao));
        this.operacao = value + this.operacao;
        this.resultado =  raiz.toString();
        this.botoes[1][4].value="C";
        this.hOperacoes.push(this.operacao);
        this.hResultados.push(this.resultado);
        this.operacao = "";
        break;
      case "%":
        
      default:
        if(this.resultado !== ""){
          if(isNaN(parseFloat(value))){
            this.operacao = this.resultado;
          }
          this.resultado = "";
        }
        this.operacao = this.operacao + value;
    }

  }

  onClickCalculaResultado(){
    this.resultado = eval(this.operacao);
    this.hOperacoes.push(this.operacao);
    this.hResultados.push(this.resultado);
    this.operacao = "";
  }

  onClickApagar(){
    this.operacao = this.operacao.substring(0,this.operacao.length-1);
  }

  viewHistory(){
    if(this.view){
      this.view = false;
    }else{
      this.view = true;
    }
  }
}
