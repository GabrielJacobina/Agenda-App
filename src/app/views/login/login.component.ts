import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/shared/model/usuario.model';
import { AuthService } from './auth.service';
import { UsuarioService } from 'src/app/shared/service/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  private usuariosApi: Usuario[];

  usuario: Usuario = new Usuario();

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService
    ) { }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(){
    this.usuarioService.getUsuarios().subscribe((usuariosApi: Usuario[]) => {
      this.usuariosApi = usuariosApi;
    })
  }

  fazerLogin(){
    this.authService.fazerLogin(this.usuario, this.usuariosApi);
  }

}
