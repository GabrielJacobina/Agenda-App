import {Component, OnInit} from '@angular/core';
import { ContatoService } from 'src/app/shared/service/contato.service';
import { Contato } from 'src/app/shared/model/contato.model';
import { ContatosFormDialogComponent } from './contatos-form-dialog/contatos-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-contatos-list',
  templateUrl: './contatos-list.component.html',
  styleUrls: ['./contatos-list.component.css']
})
export class ContatosListComponent implements OnInit {
  contatosApi: Contato[];

  constructor(
    public contatoService: ContatoService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void{
    this.getContatos()
  }

  getContatos(){
    this.contatoService.getContatos().subscribe((contatosApi: Contato[]) => {
      this.contatosApi = contatosApi;
    })
  }

  displayedColumns: string[] = ['id', 'nome', 'email', 'celular', 'acao'];

  openDialog(contato): void {
    this.contatoService.updateContato(contato);
    const dialogRef = this.dialog.open(ContatosFormDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  deletar(contato: Contato): void {
    this.contatoService.deleteContato(contato).subscribe(() => {
      this.getContatos();
    });
  }
}
