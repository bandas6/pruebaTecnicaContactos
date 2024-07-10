import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios.component';

const routes: Routes = [
  { path: '', component: UsuariosComponent },
  { path: '**', redirectTo: ''}
  // { path: 'create', component: CrearUsuarioComponent },
  // { path: 'edit/:id', component: EditarUsuarioComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
