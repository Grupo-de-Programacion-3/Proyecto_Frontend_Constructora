import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaisService } from 'src/app/servicios/pais.service';

@Component({
  selector: 'app-eliminar-pais',
  templateUrl: './eliminar-pais.component.html',
  styleUrls: ['./eliminar-pais.component.css']
})
export class EliminarPaisComponent implements OnInit {

  listaDatos: String[] = [];
  id : number = 0;

  constructor(
    private servicio : PaisService,
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
        if(datos.id_pais && datos.codigo && datos.nombre){
        this.listaDatos.push(datos.id_pais?.toString());
        this.listaDatos.push(datos.codigo);
        this.listaDatos.push(datos.nombre);
        this.id = datos.id_pais;
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
        this.router.navigate(["/parametros/listar-paises"]);
      },
      (err) => {
        alert("Error eliminando el registro");
      }
    )
  }
}
