import { Component, EventEmitter, inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filtros',
  standalone: false,
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.scss'
})
export class FiltrosComponent implements OnInit {
  
  formBuild = inject(FormBuilder);
  
  @Output() filtros: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('nombre') nombre:any;
  
  formularioFiltros!: FormGroup;

  parametros = {
    nombre: '',
    entidad: '',
    email: '',
    //... otros parámetros a utilizar
  }


  ngOnInit(): void {
    this.construirFormulario()
  }

  construirFormulario(){
    this.formularioFiltros = this.formBuild.group({
      nombre: [''],
      entidad: [''],
      email: [''],
    })
  }

  filtrar(){
    this.parametros.nombre = this.formularioFiltros.get('nombre')?.value;
    this.parametros.entidad = this.formularioFiltros.get('entidad')?.value;
    this.parametros.email = this.formularioFiltros.get('email')?.value;

    this.filtros.emit(this.parametros);
    
  }

  limpiarFiltros(){
    this.formularioFiltros.reset();
    this.parametros = {
      nombre: '',
      entidad: '',
      email: '',
      //... otros parámetros a utilizar
    }
    this.filtros.emit(this.parametros);
  }

}
