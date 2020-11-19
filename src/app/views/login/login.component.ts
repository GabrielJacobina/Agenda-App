import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/shared/model/usuario.model';
import { AuthService } from './auth.service';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  private usuarioAutenticado: boolean = false;

  usuario: Usuario = new Usuario();

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  fazerLogin(){
    this.usuarioService.verificarUsuario(this.usuario).subscribe((login: boolean) => {
      this.usuarioAutenticado = login;
       if(this.usuarioAutenticado === true) {
         this.authService.autenticar(this.usuarioAutenticado);
         this.router.navigate(['/']);
       }
    });
  }

}
