import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Usuario } from '../model/usuario.model'
import { Observable, throwError  } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuario: Usuario;
  private usuarioAutenticado: boolean;

  apiUrl='http://localhost:8080/usuarios';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private httpClient: HttpClient,
  ) { }

  public getUsuarios(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.apiUrl)
      .pipe(
        retry(2),
        catchError(this.handleError)
        )
  }

  public verificarUsuario(usuario: Usuario): Observable<boolean>{
    console.log('No método verificarUsuario')
    return this.httpClient.post<boolean>(this.apiUrl + "/login", usuario, this.httpOptions)
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
