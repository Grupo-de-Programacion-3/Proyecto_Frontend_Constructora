import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PagoService } from 'src/app/servicios/pago.service';

@Component({
  selector: 'app-eliminar-pago',
  templateUrl: './eliminar-pago.component.html',
  styleUrls: ['./eliminar-pago.component.css']
})
export class EliminarPagoComponent implements OnInit {

  listaDatos: String[] = [];
  id : number = 0;

  constructor(
    private servicio : PagoService,
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
        if(datos.id_pago && datos.valor && datos.fecha_pago && datos.comprobante_pago){
        this.listaDatos.push(datos.id_pago?.toString());
        this.listaDatos.push(datos.valor?.toString());
        this.listaDatos.push(datos.fecha_pago);
        this.listaDatos.push(datos.comprobante_pago);
        this.id = datos.id_pago;
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
        this.router.navigate(["/ventas/listar-pagos"]);
      },
      (err) => {
        alert("Error eliminando el registro");
      }
    )
  }
}
