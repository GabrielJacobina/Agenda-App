import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/shared/model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private usuarioAutenticado: boolean = false;
  constructor(private router: Router) { }

  fazerLogin(usuario: Usuario, usuarios: Usuario[]){
    for(let i = 0; i <= usuarios.length; i++){
      if (usuario.usuario === usuarios[i].usuario &&
      usuario.senha === usuarios[i].senha) {
      this.usuarioAutenticado = true;

      this.router.navigate(['/']);
      }
    }

    this.usuarioAutenticado = false;
    
  }

  

  usuarioEstaAutenticado(){
    return this.usuarioAutenticado;
  }
}
