import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  httpClient = inject(HttpClient);

  url = 'http://localhost:3000';

  obtenerUsuarios(parametros: any): Observable<any> {
    let query = '';
  
    if (parametros) {
      const queryParams = [];
  
      if (parametros.nombre) {
        queryParams.push(`nombre=${parametros.nombre}`);
      }
      if (parametros.entidad) {
        queryParams.push(`entidad=${parametros.entidad}`);
      }
      if (parametros.email) {
        queryParams.push(`email=${parametros.email}`);
      }
  
      if (queryParams.length > 0) {
        query = '?' + queryParams.join('&');
      }
    }
  
    return this.httpClient.get(`${this.url}/rows${query}`);
  }
  

  guardarUsuario(body:any){
    return this.httpClient.post(`${this.url}/rows`, body);
  }

  actualizarUsuario(id:any, body:any){
    return this.httpClient.put(`${this.url}/rows/${id}`, body);
  }

  eliminarUsuario(id:any){
    return this.httpClient.delete(`${this.url}/rows/${id}`);
  }

}
