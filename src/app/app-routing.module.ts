import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcessoComponent } from './acesso/acesso.component';
import { HomeComponent } from './home/home.component';

import { AutenticacaoGuardService } from './autenticacao-guard.service';

const ROUTES: Routes = [
    // { path: '', redirectTo: '/acesso', pathMatch: 'full' },
    // { path: 'acesso', component: AcessoComponent },
    // { path: '**', component: NoPageFoundComponent }
    { path: '', component: AcessoComponent },
    { path: 'home', component: HomeComponent, canActivate: [ AutenticacaoGuardService ] }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
