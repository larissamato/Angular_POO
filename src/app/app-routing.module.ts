import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CursosComponent } from './cursos/cursos.component';
import { CursoNovoComponent } from './curso-novo/curso-novo.component';
import { CursoEditarComponent } from './curso-editar/curso-editar.component';
import { AlunosComponent } from './alunos/alunos.component';
import { AlunoNovoComponent } from './aluno-novo/aluno-novo.component';
import { AlunoEditarComponent } from './aluno-editar/aluno-editar.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "cursos",
    component: CursosComponent
  },
  {
    path: "curso-novo",
    component: CursoNovoComponent
  },
  {
    path: "curso-editar/:id",
    component: CursoEditarComponent,
    pathMatch: 'full'
  },
  {
    path:"alunos",
    component: AlunosComponent
  },
  {
    path:"aluno-novo",
    component: AlunoNovoComponent
  },
  {
    path: "aluno-editar/:id",
    component: AlunoEditarComponent,
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
