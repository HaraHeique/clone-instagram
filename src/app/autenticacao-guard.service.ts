import { AutenticacaoService } from "./acesso/autenticacao.service";
import { CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class AutenticacaoGuardService implements CanActivate {
  public constructor(private autenticacaoService: AutenticacaoService) {}

  public canActivate(): boolean {
    return this.autenticacaoService.autenticado();
  }
}
