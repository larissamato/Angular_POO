import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Aluno } from './aluno.model';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  baseUrl = 'http://localhost:8080/academico/alunos';

  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar) {}

  openSnackBar(message: string) {
    this._snackBar.open(message, 'X', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  getAlunoList(): Observable<Aluno[]> {
    return this.httpClient.get<Aluno[]>(`${this.baseUrl}`);
  }

  getAluno(id: number): Observable<Aluno> {
    return this.httpClient.get<Aluno>(`${this.baseUrl}/${id}`);
  }

  createAluno(aluno: Aluno): Observable<Aluno> {
    const payload = {
      ...aluno,
      curso: {
        idcurso: aluno.curso.idcurso
      }
    };
    return this.httpClient.post<Aluno>(`${this.baseUrl}`, payload);
  }

  updateAluno(id: number, aluno: Aluno): Observable<Aluno> {
    const payload = {
      ...aluno,
      curso: {
        idcurso: aluno.curso.idcurso
      }
    };
    return this.httpClient.put<Aluno>(`${this.baseUrl}/${id}`, payload);
  }

  deleteAluno(id: number): Observable<Aluno> {
    return this.httpClient.delete<Aluno>(`${this.baseUrl}/${id}`);
  }
}
