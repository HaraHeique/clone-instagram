import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Usuario } from "../usuario.model";
import { AutenticacaoService } from "./../autenticacao.service";

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.css"],
})
export class CadastroComponent implements OnInit {
  @Output("exibirLogin")
  public cadastroEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output("erroCadastro")
  public erroCadastroEmitter: EventEmitter<void> = new EventEmitter<void>();

  public formularioSubmetido: boolean;
  public erro: string;
  public formulario: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    nome_completo: new FormControl(null, Validators.required),
    nome_usuario: new FormControl(null, Validators.required),
    senha: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(private autenticacaoService: AutenticacaoService) {}

  ngOnInit(): void {}

  public exibirPainelCadastro(): void {
    this.cadastroEmitter.emit(false);
  }

  public cadastrarUsuario(): void {
    let usuario: Usuario = new Usuario(
      this.formulario.value.email,
      this.formulario.value.nome_completo,
      this.formulario.value.nome_usuario,
      this.formulario.value.senha
    );

    this.autenticacaoService
      .cadastrarUsuario(usuario)
      .then(() => this.exibirPainelCadastro())
      .catch((error: Error) => {
          this.erro = error.message
          this.erroCadastroEmitter.emit();
        });
  }
}
