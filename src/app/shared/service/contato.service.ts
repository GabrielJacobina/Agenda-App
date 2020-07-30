import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError  } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Contato } from '../model/contato.model'

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  apiUrl='http://localhost:8080/contatos';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  public getContatos(): Observable<Contato[]> {
    return this.httpClient.get<Contato[]>(this.apiUrl)
      .pipe(
        retry(2),
        catchError(this.handleError)
        )
  }

  public postContatos(contato: any): Observable<Contato>{
    return this.httpClient.post<any>(this.apiUrl, contato, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}