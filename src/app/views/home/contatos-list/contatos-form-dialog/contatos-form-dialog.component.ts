import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContatoService } from 'src/app/shared/service/contato.service';
import { Contato } from 'src/app/shared/model/contato.model';
import { ContatosListComponent } from '../contatos-list.component';

@Component({
  selector: 'app-contatos-form-dialog',
  templateUrl: './contatos-form-dialog.component.html',
  styleUrls: ['./contatos-form-dialog.component.css']
})
export class ContatosFormDialogComponent implements OnInit {
  public contatoForm: FormGroup;
  contato: Contato;
  public action: string;

  constructor(
    private fb: FormBuilder,
    private rest: ContatoService,
    public dialogRef: MatDialogRef<ContatosFormDialogComponent>,
    ) {}

  ngOnInit(): void {
    this.contato = this.rest.getContato();
    if(!this.contato){
      this.action = "cadastrar";
      this.contatoForm = this.fb.group({
        nome: ['', [Validators.required]],
        email: ['', [Validators.required]],
        telefone: ['', [Validators.required]],
      })
    } else{
      this.action = "atualizar";
      this.contatoForm = this.fb.group({
        nome: [this.contato.nome, [Validators.required]],
        email: [this.contato.email, [Validators.required]],
        telefone: [this.contato.telefone, [Validators.required]],
      })
    }
  }

  saveContato(){
    console.log("entrou no método save ");
    if (this.action === "atualizar") {
      this.rest.putContato(this.contatoForm.value).subscribe(() => {})
    } else{
      this.rest.postContatos(this.contatoForm.value).subscribe(result => {})
    }
    this.dialogRef.close();
    this.contatoForm.reset();
    this.rest.contato = null;
    window.location.reload();
  }

  cancel(): void {
    this.dialogRef.close();
    this.contatoForm.reset();
    this.rest.contato = null;
  }
  value = 'Clear me';

}
