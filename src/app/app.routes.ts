import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'usuarios', loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule) },
    { path: '**', redirectTo: 'usuarios', pathMatch: 'full' }
];
