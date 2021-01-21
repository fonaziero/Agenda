import { ContatoDetalheComponent } from './../contato-detalhe/contato-detalhe.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ContatoService } from '../contato.service';
import { Contato } from './contato';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario: FormGroup;
  contatos: Contato[] = [];
  colunas = ['foto', 'id', 'nome', 'email', 'favorito'];

  totalElementos = 0;
  pagina = 0;
  tamanho = 10;
  pageSizeOptions: number[] = [10]

  constructor(
    private service: ContatoService,
    private  fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.construirFormulario();
    this.listarContato(this.pagina, this.tamanho);
  }

  paginar(event: PageEvent) {
    this.pagina = event.pageIndex;
    this.listarContato(this.pagina, this.tamanho);
  }

  listarContato(page = 0, size = 10 ) {
    this.service.list(page, size).subscribe(res => {
      this.contatos = res.content;
      this.totalElementos = res.totalElements;
      this.pagina = res.size;
      console.log(res);
    });
  }

  construirFormulario() {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      email: ['',[ Validators.email,Validators.required]]
    });
  }

  favoritar(contato: Contato) {
    this.service.favorite(contato).subscribe( res => {
      contato.favorito = !contato.favorito;
    })
  }

  submit() {
    const formValues = this.formulario.value;
    const contato: Contato = new Contato(formValues.nome, formValues.email);
    this.service.save(contato).subscribe(res => {
      this.listarContato();
      this.snackBar.open('O contato foi adicionado', 'Sucesso!', {
        duration: 3000
      })
      this.formulario.reset();
    });
  }

  uploadFoto(event, contato) {
    const files = event.target.files;
    if(files) {
      const foto = files[0];
      const formData: FormData = new FormData();
      formData.append("foto", foto);
      this.service.upload(contato, formData).subscribe(res => {
        this.listarContato();
      })
    }
  }

  visualizarContato(contato: Contato){
    this.dialog.open(ContatoDetalheComponent, {
      width: '400px',
      height: '450px',
      data: contato
    });
  }

}
