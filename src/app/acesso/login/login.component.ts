import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AutenticacaoService } from "../autenticacao.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  @Output("exibirCadastro")
  public cadastroEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output("erroLogin")
  public erroLoginEmitter: EventEmitter<void> = new EventEmitter<void>();

  public formulario: FormGroup;
  public formularioSubmetido: boolean;
  public erro: string;

  public constructor(private autenticacaoService: AutenticacaoService) {
    this.formulario = this.criarFormulario();
    this.formularioSubmetido = false;
  }

  public ngOnInit(): void {}

  public exibirPainelCadastro(): void {
    this.cadastroEmitter.emit(true);
  }

  public submeterAutenticacao(): void {
    this.formularioSubmetido = true;

    if (this.formulario.valid) {
      this.autenticacaoService
        .autenticarUsuario(
          this.formulario.value.email,
          this.formulario.value.senha
        )
        .then()
        .catch((error: Error) => {
          this.erro = error.message;
          this.erroLoginEmitter.emit();
        });
    } else {
      this.formulario.markAllAsTouched();
    }
  }

  public get formControls(): any {
    return this.formulario.controls;
  }

  private criarFormulario(): FormGroup {
    return new FormGroup({
      email: new FormControl("", [
        Validators.required, 
        Validators.email
      ]),
      senha: new FormControl("", [
        Validators.required,
        Validators.minLength(6)
      ]),
    });
  }
}
