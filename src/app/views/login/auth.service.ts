import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/shared/model/usuario.model';
import { UsuarioService } from 'src/app/shared/service/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado: boolean = false;
  constructor() { }

  autenticar(usuarioAut: boolean){
    this.usuarioAutenticado = usuarioAut;
  }
  usuarioEstaAutenticado(){
    return this.usuarioAutenticado;
  }
}
