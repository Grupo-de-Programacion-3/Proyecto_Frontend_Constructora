import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-eliminar-cliente',
  templateUrl: './eliminar-cliente.component.html',
  styleUrls: ['./eliminar-cliente.component.css']
})
export class EliminarClienteComponent implements OnInit {

  listaDatos: String[] = [];
  id: number = 0;

  constructor(
    private servicio: ClienteService,
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
        if (datos.id_cliente && datos.documento && datos.nombres 
          && datos.apellidos && datos.fecha_nacimiento && datos.fotografia 
          && datos.num_celular && datos.correo && datos.direccion) {

          this.listaDatos.push(datos.id_cliente?.toString());
          this.listaDatos.push(datos.documento);
          this.listaDatos.push(datos.nombres);
          this.listaDatos.push(datos.apellidos);
          this.listaDatos.push(datos.fecha_nacimiento);
          this.listaDatos.push(datos.fotografia);
          this.listaDatos.push(datos.num_celular);
          this.listaDatos.push(datos.correo);
          this.listaDatos.push(datos.direccion);
          this.id = datos.id_cliente;

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
        this.router.navigate(["/ventas/listar-clientes"]);
      },
      (err) => {
        alert("Error eliminando el registro");
      }
    )
  }
}
