import { Usuario } from "./usuario.model";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class AutenticacaoService {
  private tokenId: string;

  public constructor(private router: Router) {}

  public async cadastrarUsuario(usuario: Usuario): Promise<any> {
    return await firebase
      .auth()
      .createUserWithEmailAndPassword(usuario.email, usuario.senha)
      .then((resposta: any) => {
        /* Criando um base 64 string para o email do usuário, pois os paths
                no firebase não aceitam caracteres especiais */
        const b64UserEmail: string = btoa(usuario.email);

        // Removendo a senha do usuário
        delete usuario.senha;

        // São criados referências que no caso é um path, onde cada pedaço do path é um nó
        firebase
          .database()
          .ref(`usuario_detalhe/${b64UserEmail}`)
          .set(usuario)
          .then((resposta: Response) =>
            console.log("Cadastro realizado com sucesso!")
          )
          .catch((error: Error) => console.log("Erro ao cadastrar usuário."));
      })
      .catch((error: Error) =>
        console.log(
          "Erro ao cadastrar usuário. Provavelmente usuário já existe."
        )
      );
  }

  public async autenticarUsuario(email: string, senha: string): Promise<any> {
    return await firebase
      .auth()
      .signInWithEmailAndPassword(email, senha)
      .then((resposta: any) => {
        firebase
          .auth()
          .currentUser.getIdToken()
          .then((tokenId: string) => {
            // console.log("xD");
            this.tokenId = tokenId;
            localStorage.setItem("idToken", tokenId);
            this.router.navigate(["/home"]);
          });
      });
  }

  public autenticado(): boolean {
    // Checar uma validação melhor
    /* Quando a página recebe um refresh o serviços singleton também é instanciado novamente.
        Logo é necessário colocar no localstorage, que serve como um cookie */

    if (!this.tokenId && localStorage.getItem("idToken")) {
      this.tokenId = localStorage.getItem("idToken");
    } else if (!this.tokenId) {
      this.router.navigate(["/"]);
    }

    return this.tokenId !== undefined;
  }

  public sair(): void {
    // Removendo tanto o token armazenado no localstorage quanto do firebase
    firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.removeItem("idToken");
        this.tokenId = undefined;
        this.router.navigate(["/"]);
      });
  }
}
