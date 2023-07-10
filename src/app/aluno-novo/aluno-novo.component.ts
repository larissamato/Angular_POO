import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Aluno } from '../alunos/aluno.model';
import { AlunoService } from '../alunos/aluno.service';
import { Curso } from '../cursos/curso.model';
import { CursoService } from '../cursos/curso.service';

@Component({
  selector: 'app-aluno-novo',
  templateUrl: './aluno-novo.component.html',
  styleUrls: ['./aluno-novo.component.css']
})
export class AlunoNovoComponent implements OnInit {
  aluno: Aluno = new Aluno();
  cursos: Curso[] = [];
  selectedCursoId: number = 0;

  constructor(
    private alunoService: AlunoService,
    private cursoService: CursoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCursoList();
  }

  getCursoList() {
    this.cursoService.getCursoList().subscribe(
      dados => {
        this.cursos = dados;
      },
      error => {
        console.log(error);
      }
    );
  }

  salvar() {
    this.aluno.curso = {
      idcurso: this.selectedCursoId
    };

    this.alunoService.createAluno(this.aluno).subscribe(
      dado => {
        console.log(dado);
        this.alunoService.openSnackBar('Aluno criado com sucesso!');
        this.router.navigate(['/alunos']);
      },
      error => {
        console.log(error);
      }
    );
  }

  cancelar() {
    this.router.navigate(['/alunos']);
  }
}
