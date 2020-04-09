import { ProgressoService } from './../../progresso.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as firebase from 'firebase';

import { BdService } from './../../bd.service';
import { Observable, interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {
  public email: string;
  public imagem: any;

  public progressoPublicacao: string = "pendente";
  public porcentagemUpload: number = 0;

  @Output() public atualizarTimeLineEventEmitter: EventEmitter<any> = new EventEmitter<any>();

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null)
  });

  constructor(
    private bdService: BdService,
    private progressoService: ProgressoService
  ) { }

  ngOnInit(): void {
    // Este método é responsável por retornar os dados do usuário corrente autenticado
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
    });
  }

  public publicar(): void {
    this.bdService.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0]
    });

    // Acompanhando as atualizações do progresso de upload da imagem
    let acompanhamentoUpload: Observable<number> = interval(1500);
    
    // Para submeter valores para dentro do observable
    let continua: Subject<boolean> = new Subject();
    continua.next(true);

    acompanhamentoUpload.pipe(
      // Parecido com o while
      takeUntil(continua)
    )
    .subscribe(() => {
      // console.log(this.progressoService.status);
      // console.log(this.progressoService.estado);
      this.progressoPublicacao = "andamento";
      this.porcentagemUpload = Math.round(this.progressoService.calcularPorcentagemUpload());

      if (this.progressoService.status === "concluido") {
        this.progressoPublicacao = "concluido";

        // emitir um evento qualquer para o component parent para este atualizar o component de publicações
        this.atualizarTimeLineEventEmitter.emit();

        continua.next(false);
      }
    });
  }

  public preparaImagemUpload(event: Event): void {
    // console.log((<HTMLInputElement>event.target).value);
    this.imagem = (event.target as HTMLInputElement).files;
  }
}
