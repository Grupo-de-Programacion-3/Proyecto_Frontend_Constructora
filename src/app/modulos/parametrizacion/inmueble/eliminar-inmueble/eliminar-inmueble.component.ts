import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InmuebleService } from 'src/app/servicios/inmueble.service';

@Component({
  selector: 'app-eliminar-inmueble',
  templateUrl: './eliminar-inmueble.component.html',
  styleUrls: ['./eliminar-inmueble.component.css']
})
export class EliminarInmuebleComponent implements OnInit {

  listaDatos: String[] = [];
  id : number = 0;

  constructor(
    private servicio : InmuebleService,
    private router : Router,
    private route : ActivatedRoute) {
   }


  ngOnInit(): void {
    let id = this.route.snapshot.params["id"];
    this.ObtenerRegistroPorId(id);
  }

  ObtenerRegistroPorId(id : number){
    this.servicio.BuscarRegistros(id).subscribe(
      (datos) =>{
        if(datos.id_inmueble && datos.codigo && datos.nombre && datos.valor){
        this.listaDatos.push(datos.id_inmueble?.toString());
        this.listaDatos.push(datos.codigo);
        this.listaDatos.push(datos.nombre);
        this.listaDatos.push(datos.valor.toString());
        this.id = datos.id_inmueble;
        }
      },
      (err) => {
        alert("No se encuentra el registro con id " + id)
      }
    )
  }

  EliminarRegistro(){

    let id = this.id;

    this.servicio.EliminarRegistro(id).subscribe(
      (datos) => {
        alert("Registro Eliminado correctanente");
        this.router.navigate(["/parametros/listar-inmuebles"]);
      },
      (err) => {
        alert("Error eliminando el registro");
      }
    )
  }
}
