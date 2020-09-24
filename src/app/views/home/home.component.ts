import { Component, OnInit } from '@angular/core';
import { ContatosFormDialogComponent } from './contatos-list/contatos-form-dialog/contatos-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ContatoService } from 'src/app/shared/service/contato.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public contatoService: ContatoService,
  ) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    this.contatoService.updateContato(null)
    const dialogRef = this.dialog.open(ContatosFormDialogComponent, {
      width: '500px',
    });
  }

}
