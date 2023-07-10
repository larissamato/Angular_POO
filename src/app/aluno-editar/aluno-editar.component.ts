import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Aluno } from '../alunos/aluno.model';
import { AlunoService } from '../alunos/aluno.service';
import { Curso } from '../cursos/curso.model';
import { CursoService } from '../cursos/curso.service';

@Component({
  selector: 'app-aluno-editar',
  templateUrl: './aluno-editar.component.html',
  styleUrls: ['./aluno-editar.component.css']
})
export class AlunoEditarComponent implements OnInit {
  aluno: Aluno = new Aluno();
  cursos: Curso[] = [];
  selectedCursoId: number = 0;

  constructor(
    private alunoService: AlunoService,
    private cursoService: CursoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getAluno(id);
    this.getCursos();
  }

  getAluno(id: number): void {
    this.alunoService.getAluno(id).subscribe(
      aluno => {
        this.aluno = aluno;
        console.log(aluno);
      },
      error => {
        console.log(error);
      }
    );
  }

  getCursos(): void {
    this.cursoService.getCursoList().subscribe(
      cursos => {
        this.cursos = cursos;
      },
      error => {
        console.log(error);
      }
    );
  }

  atualizar(): void {
    this.aluno.curso = {
      idcurso: this.selectedCursoId
    };

    this.alunoService.updateAluno(this.aluno.idaluno, this.aluno).subscribe(
      aluno => {
        this.alunoService.openSnackBar('Aluno atualizado com sucesso!');
        this.router.navigate(['/alunos']);
        console.log(aluno);
      },
      error => {
        console.log(error);
      }
    );
  }

  cancelar(): void {
    this.router.navigate(['/alunos']);
  }
}
