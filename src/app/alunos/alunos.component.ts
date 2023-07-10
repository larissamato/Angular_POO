import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

import { AlunoService } from './aluno.service';
import { Aluno } from './aluno.model';
import { Curso } from '../cursos/curso.model';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {

  alunoDataSource: MatTableDataSource<Aluno> = new MatTableDataSource();

  displayedAlunos: string[] = ['idaluno', 'nome', 'sexo', 'dt_nasc', 'update', 'delete'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private alunoService: AlunoService, private router: Router) { }

  ngOnInit(): void {
    this.getAlunoList();
  }

  getAlunoList() {
    this.alunoService.getAlunoList().subscribe(
      alunos => {
        this.alunoDataSource = new MatTableDataSource<Aluno>(alunos);
        this.alunoDataSource.paginator = this.paginator;
        this.alunoDataSource.sort = this.sort;
      },
      error => console.log(error)
    );
  }

  filtrarAlunos(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.alunoDataSource.filter = valor.trim().toLowerCase();
  }

  deletarAluno(aluno: Aluno) {
    this.alunoService.deleteAluno(aluno.idaluno).subscribe(
      () => {
        this.alunoService.openSnackBar('Aluno excluído!');
        this.getAlunoList();
      },
      error => console.log(error)
    );
  }

  navigateToAlunoNovo() {
    this.router.navigate(['/aluno-novo']);
  }

  navigateToAlunoEditar(aluno: Aluno) {
    this.router.navigate([`/aluno-editar/${aluno.idaluno}`]);
  }

}
