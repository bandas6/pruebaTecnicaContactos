import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../services/usuarios/usuarios.service';

@Component({
  selector: 'app-usuarios',
  standalone: false,
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit {

  formBuilder = inject(FormBuilder);
  
  usuariosService = inject(UsuariosService);

  formularioContacto!:FormGroup;
  
  contactos: any;

  mensajeError: boolean = false;
  modoEdicion: boolean = false;
  contactoId: any;

  
  ngOnInit(): void {
    this.construirFormulario();
    this.obtenerContactos();
  }

  construirFormulario(){
    this.formularioContacto = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      entidad: ['',[Validators.required]],
      email: ['',Validators.required],
    })
  }

  agregarContacto(){
    console.log(this.formularioContacto.value);
    if(this.formularioContacto.status === 'INVALID'){
      this.mensajeError = true;
      return
    }
    this.mensajeError = false;
    this.usuariosService.guardarUsuario(this.formularioContacto.value).subscribe({
      next:(resp:any)=>{
        this.obtenerContactos();
      }
    })
    this.formularioContacto.reset();  // Reseteamos el formulario para que los valores sean vacíos.
  }

  obtenerContactos(parametros?:any){
    this.usuariosService.obtenerUsuarios(parametros).subscribe({
      next: (res:any)=>{
        console.log(res)
        this.contactos = res;
      }
    })
  }

  seleccionarContactoEditar(contacto:any){
    this.modoEdicion = true;
    this.contactoId = contacto.id;
    this.formularioContacto.patchValue({
      nombre: contacto.nombre,
      entidad: contacto.entidad,
      email: contacto.email,
    })
  }

  editarContacto(){
    if(this.formularioContacto.status === 'INVALID'){
      this.mensajeError = true;
      return
    }
    this.mensajeError = false;
    this.usuariosService.actualizarUsuario( this.contactoId, this.formularioContacto.value).subscribe({
      next: (resp:any)=>{
        console.log(resp)
        this.obtenerContactos();
        this.modoEdicion = false;
      }
    })
    this.formularioContacto.reset();  // Reseteamos el formulario para que los valores sean vacíos.
  }

  borrarContacto(contacto:any){
    this.usuariosService.eliminarUsuario(contacto.id).subscribe({
      next: (resp)=>{
        console.log(resp)
        this.obtenerContactos()
      }
    })
  }

  filtrar(filtros:any){
    console.log(filtros);
    this.obtenerContactos(filtros);
  }

}
