import {Component, OnInit} from '@angular/core';
import { ContatoService } from 'src/app/shared/service/contato.service';
import { Contato } from 'src/app/shared/model/contato.model';

@Component({
  selector: 'app-contatos-list',
  templateUrl: './contatos-list.component.html',
  styleUrls: ['./contatos-list.component.css']
})
export class ContatosListComponent implements OnInit {
  contatos: string[] = ['João', 'Arya', 'Sonsa', 'Ned', 'Três olhos'];
  contatosApi: Contato[];

  constructor(
    public contatoService: ContatoService
  ) {}

  ngOnInit(): void{
    this.getContatos()
  }

  getContatos(){
    this.contatoService.getContatos().subscribe((contatosApi: Contato[]) => {
      this.contatosApi = contatosApi;
    })
  }

}
