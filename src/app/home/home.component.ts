import { Component, OnInit, ViewChild } from '@angular/core';

import { AutenticacaoService } from './../acesso/autenticacao.service';
import { PublicacoesComponent } from './publicacoes/publicacoes.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('publicacoesComponent') public publicacoesComponent: PublicacoesComponent;

  constructor(private autenticacaoService: AutenticacaoService) { }

  ngOnInit(): void {
  }

  public logout(): void {
    this.autenticacaoService.sair();
  }

  public atualizarTimeLine(): void {
    this.publicacoesComponent.atualizarTimeLine();
  }
}
