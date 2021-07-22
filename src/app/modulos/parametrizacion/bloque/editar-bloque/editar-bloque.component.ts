import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BloqueModelo } from 'src/app/modelos/bloque.modelo';
import { BloqueService } from 'src/app/servicios/bloque.service';

@Component({
  selector: 'app-editar-bloque',
  templateUrl: './editar-bloque.component.html',
  styleUrls: ['./editar-bloque.component.css']
})
export class EditarBloqueComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio : BloqueService,
    private router : Router,
    private route : ActivatedRoute) {
    
   }

   ConstruirFormulario(){
     this.fgValidador= this.fb.group({
       id: ['',[Validators.required]],
       codigo: ['',[Validators.required]],
       nombre: ['',[Validators.required]],
       descripcion: ['',[Validators.required]]
     });
   }

  ngOnInit(): void {
    this.ConstruirFormulario();
    let id = this.route.snapshot.params["id"];
    this.ObtenerRegistroPorId(id);
  }

  ObtenerRegistroPorId(id : number){
    this.servicio.BuscarRegistros(id).subscribe(
      (datos) =>{
        this.ObtenerFgValidador.id.setValue(datos.id_bloque);
        this.ObtenerFgValidador.codigo.setValue(datos.codigo);
        this.ObtenerFgValidador.nombre.setValue(datos.nombre);
        this.ObtenerFgValidador.descripcion.setValue(datos.descripcion);
      },
      (err) => {
        alert("No se encuentra el registro con id " + id)
      }
    )
  }

  get ObtenerFgValidador(){
    return this.fgValidador.controls;
  }

  ModificarRegistro(){

    let id = this.ObtenerFgValidador.id.value;
    let cod = this.ObtenerFgValidador.codigo.value;
    let nom = this.ObtenerFgValidador.nombre.value;
    let des = this.ObtenerFgValidador.descripcion.value;

    let modelo : BloqueModelo = new BloqueModelo();

    modelo.id_bloque = id;
    modelo.codigo = cod;
    modelo.nombre = nom;
    modelo.descripcion = des;

    this.servicio.ModificarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro modificado correctanente");
        this.router.navigate(["/parametros/listar-bloques"]);
      },
      (err) => {
        alert("Error modificando el registro");
      }
    )
  }
}
