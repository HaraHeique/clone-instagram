import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import Imagem from './imagem.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
      // Define a trigger e seus estados, animações e transições
      trigger('banner', [
        state('escondido', style({
            opacity: 0
        })),
        state('visivel', style({
            opacity: 1
        })),
        transition('escondido <=> visivel', [
          animate('1s ease-in')
        ]),
        // transition('visivel => escondido', [
        //   animate('1s ease-in')
        // ])
      ])
  ]
})
export class BannerComponent implements OnInit {
  public estado: string = "escondido";
  public imagens: Array<Imagem> = [
    { estado: 'visivel', url: 'assets/banner-acesso/img_1.png' },
    { estado: 'escondido', url: 'assets/banner-acesso/img_2.png' },
    { estado: 'escondido', url: 'assets/banner-acesso/img_3.png' },
    { estado: 'escondido', url: 'assets/banner-acesso/img_4.png' },
    new Imagem('escondido', 'assets/banner-acesso/img_5.png')
  ];

  constructor() { }

  ngOnInit(): void {
    setTimeout(()=> this.rotacaoImagem(), 3000);
  }

  public toggleState(): void {
    this.estado = this.estado === "visivel" ? "escondido" : "visivel"
  }

  private rotacaoImagem(): void {
    let idx: number;

    for (let i: number = 0; i <= this.imagens.length - 1; i++) {
      if (this.imagens[i].estado === "visivel") {
        this.imagens[i].estado = "escondido";
        idx = i === 4 ? 0 : i + 1;
        break; // Não é necessário continuar o loop
      }
    }

    // Exibir a imagem da posição idx
    this.imagens[idx].estado = "visivel";

    setTimeout(()=> this.rotacaoImagem(), 3000);
  }
}
