import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Curso } from '../cursos/curso.model';
import { CursoService } from '../cursos/curso.service';

@Component({
  selector: 'app-curso-editar',
  templateUrl: './curso-editar.component.html',
  styleUrls: ['./curso-editar.component.css']
})
export class CursoEditarComponent implements OnInit {

  curso: Curso = new Curso();

  constructor(private cursoservice: CursoService,
              private router: Router,
              private rotaAtiva: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCurso(this.rotaAtiva.snapshot.paramMap.get('id'));
  }

  getCurso(id: any) {
        this.cursoservice.getCurso(id).subscribe(
            dado =>   { 
                          this.curso = dado;
                          console.log(dado);
                      },
            error =>  {
                          console.log(error);
                      }
        )
  }

  atualizar() {
    this.cursoservice.updateCurso(this.curso.idcurso, this.curso).subscribe(
        dado => {
                  this.cursoservice.openSnackBar('Curso atualizado !');
                  this.router.navigate(['/cursos']);
                  console.log(dado);
                },
        error => {
                  console.log(error);
                })
  }

  cancelar() {
      this.router.navigate(['/cursos']);
  }
}