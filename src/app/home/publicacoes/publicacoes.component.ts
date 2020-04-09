import { BdService } from './../../bd.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {
  public userEmail: string;
  public publicacoes: any;

  constructor(private bdService: BdService) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      this.userEmail = user.email;
      this.atualizarTimeLine();
    });
  }

  public atualizarTimeLine(): void {
    this.bdService.consultaPublicacoes(this.userEmail)
      .then((publicacoes: any) => {
        this.publicacoes = publicacoes;
      });
  }
}
