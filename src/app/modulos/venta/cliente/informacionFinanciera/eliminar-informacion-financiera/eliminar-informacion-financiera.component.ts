import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InformacionFinancieraService } from 'src/app/servicios/informacion-financiera.service';

@Component({
  selector: 'app-eliminar-informacion-financiera',
  templateUrl: './eliminar-informacion-financiera.component.html',
  styleUrls: ['./eliminar-informacion-financiera.component.css']
})
export class EliminarInformacionFinancieraComponent implements OnInit {

  listaDatos: String[] = [];
  id: number = 0;

  constructor(
    private servicio: InformacionFinancieraService,
    private router: Router,
    private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    let id = this.route.snapshot.params["id"];
    this.ObtenerRegistroPorId(id);
  }

  ObtenerRegistroPorId(id: number) {
    this.servicio.BuscarRegistros(id).subscribe(
      (datos) => {
        if (datos.id_informacion_financiera && datos.documento_cliente && datos.total_ingresos 
          && datos.empresa_trabaja && datos.cargo && datos.salario 
          && datos.tiempo_trab_actual && datos.nom_ref_familiar && datos.tel_ref_familiar
          && datos.nom_ref_personal && datos.tel_ref_personal) {

          this.listaDatos.push(datos.id_informacion_financiera?.toString());
          this.listaDatos.push(datos.documento_cliente);
          this.listaDatos.push(datos.total_ingresos.toString());
          this.listaDatos.push(datos.empresa_trabaja);
          this.listaDatos.push(datos.cargo);
          this.listaDatos.push(datos.salario.toString());
          this.listaDatos.push(datos.tiempo_trab_actual.toString());
          this.listaDatos.push(datos.nom_ref_familiar);
          this.listaDatos.push(datos.tel_ref_familiar);
          this.listaDatos.push(datos.nom_ref_personal);
          this.listaDatos.push(datos.tel_ref_personal);
          this.id = datos.id_informacion_financiera;

        }
      },
      (err) => {
        alert("No se encuentra el registro con id " + id)
      }
    )
  }

  EliminarRegistro() {

    let id = this.id;

    this.servicio.EliminarRegistro(id).subscribe(
      (datos) => {
        alert("Registro Eliminado correctanente");
        this.router.navigate(["/ventas/listar-informacionesFinancieras"]);
      },
      (err) => {
        alert("Error eliminando el registro");
      }
    )
  }
}
