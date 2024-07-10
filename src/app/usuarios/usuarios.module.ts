import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { FiltrosComponent } from './components/filtros/filtros.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';


@NgModule({
  declarations: [
    UsuariosComponent,
    FiltrosComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    ReactiveFormsModule
  ]
})
export class UsuariosModule { }
