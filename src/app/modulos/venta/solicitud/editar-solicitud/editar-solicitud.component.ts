import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudModelo } from 'src/app/modelos/solicitud.modelo';
import { SolicitudService } from 'src/app/servicios/solicitud.service';

@Component({
  selector: 'app-editar-solicitud',
  templateUrl: './editar-solicitud.component.html',
  styleUrls: ['./editar-solicitud.component.css']
})
export class EditarSolicitudComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio: SolicitudService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      id: ['', [Validators.required]],
      fecha_solicitud: ['', [Validators.required]],
      oferta_eco_separarlo: ['', [Validators.required]],
      estado: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    let id = this.route.snapshot.params["id"];
    this.ObtenerRegistroPorId(id);
  }

  ObtenerRegistroPorId(id: number) {
    this.servicio.BuscarRegistros(id).subscribe(
      (datos) => {
        this.ObtenerFgValidador.id.setValue(datos.id_solicitud);
        this.ObtenerFgValidador.fecha_solicitud.setValue(datos.fecha_solicitud);
        this.ObtenerFgValidador.oferta_eco_separarlo.setValue(datos.oferta_eco_separarlo);
        this.ObtenerFgValidador.estado.setValue(datos.estado);
      },
      (err) => {
        alert("No se encuentra el registro con id " + id)
      }
    )
  }

  get ObtenerFgValidador() {
    return this.fgValidador.controls;
  }

  ModificarRegistro() {

    let id = this.ObtenerFgValidador.id.value;
    let f_s = this.ObtenerFgValidador.fecha_solicitud.value;
    let oes = this.ObtenerFgValidador.oferta_eco_separarlo.value;
    let est = this.ObtenerFgValidador.estado.value;

    let modelo: SolicitudModelo = new SolicitudModelo();

    modelo.id_solicitud = id;
    modelo.fecha_solicitud = f_s;
    modelo.oferta_eco_separarlo = oes;
    modelo.estado = est;

    this.servicio.ModificarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro modificado correctanente");
        this.router.navigate(["/ventas/listar-solicitudes"]);
      },
      (err) => {
        alert("Error modificando el registro");
      }
    )
  }
}
