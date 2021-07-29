import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudService } from 'src/app/servicios/solicitud.service';

@Component({
  selector: 'app-eliminar-solicitud',
  templateUrl: './eliminar-solicitud.component.html',
  styleUrls: ['./eliminar-solicitud.component.css']
})
export class EliminarSolicitudComponent implements OnInit {

  listaDatos: String[] = [];
  id : number = 0;

  constructor(
    private servicio : SolicitudService,
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
        if(datos.id_solicitud && datos.fecha_solicitud && datos.oferta_eco_separarlo && datos.estado){
        this.listaDatos.push(datos.id_solicitud?.toString());
        this.listaDatos.push(datos.fecha_solicitud);
        this.listaDatos.push(datos.oferta_eco_separarlo?.toString());
        this.listaDatos.push(datos.estado);
        this.id = datos.id_solicitud;
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
        this.router.navigate(["/ventas/listar-solicitudes"]);
      },
      (err) => {
        alert("Error eliminando el registro");
      }
    )
  }
}
