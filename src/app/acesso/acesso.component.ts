import { Component, OnInit } from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
} from "@angular/animations";

@Component({
  selector: "app-acesso",
  templateUrl: "./acesso.component.html",
  styleUrls: ["./acesso.component.css"],
  animations: [
    trigger("animacao-banner", [
      state(
        "criado",
        style({
          opacity: 1,
        })
      ),
      transition("void => criado", [
        style({ opacity: 0, transform: "translate(-30px, 0)" }), // Alteração visuais
        animate("500ms 0s ease-in-out"), // Duração, delay e aceleração(easing)
      ]),
    ]),
    trigger("animacao-painel", [
      state(
        "criado",
        style({
          opacity: 1,
        }), 
      ),
      state(
        "erro",
        style({
          opacity: 1,
        })
      ),
      transition("criado => erro", [
        animate(
          "1.5s 0s ease-in-out",
          keyframes([
            // offset determina em qual momento será utilizada o keyframes durante a animação
            style({ offset: 0.15, opacity: 1, transform: "translateX(0)" }),
            style({ offset: 0.86, opacity: 1, transform: "translateX(0)" }),

            style({ offset: 0.88, opacity: 1, transform: "translateY(-10px)" }),
            style({ offset: 0.9, opacity: 1, transform: "translateY(10px)" }),
            style({ offset: 0.92, opacity: 1, transform: "translateY(-10px)" }),
            style({ offset: 0.94, opacity: 1, transform: "translateY(10px)" }),
            style({ offset: 0.96, opacity: 1, transform: "translateY(-10px)" }),
            style({ offset: 0.98, opacity: 1, transform: "translateY(10px)" }),

            style({ offset: 1, opacity: 1, transform: "translateY(0)" }),
          ])
        ),
      ]),
      transition("void => criado", [
        style({ opacity: 0, transform: "translate(30px, 0)" }), // Alteração visuais
        animate("500ms 0s ease-in-out"), // Duração, delay e aceleração(easing)
      ]),
    ]),
  ],
})
export class AcessoComponent implements OnInit {
  public estadoBanner: string = "criado";
  public estadoPainel: string = "criado";

  public cadastro: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  public exibirFormCadastro(cadastrar: boolean): void {
    this.cadastro = cadastrar;
  }

  // Método de callback da animação
  public inicioDaAnimacao(): void {
    // console.log("Início da animação");
  }

  // Método de callback da animação
  public fimDaAnimacao(): void {
    this.estadoPainel = "criado";
  }

  public animarErroLogin(): void {
    this.animarErro();
  }

  public animarErroCadastro(): void {
    this.animarErro();
  }

  private animarErro(): void {
    this.estadoPainel = "erro";
  }
}
