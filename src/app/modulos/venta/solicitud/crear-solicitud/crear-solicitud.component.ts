import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SolicitudModelo } from 'src/app/modelos/solicitud.modelo';
import { SolicitudService } from 'src/app/servicios/solicitud.service';

@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.css']
})
export class CrearSolicitudComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio: SolicitudService,
    private router: Router) {

  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      fecha_solicitud: ['', [Validators.required]],
      oferta_eco_separarlo: ['', [Validators.required]],
      estado: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
  }

  get ObtenerFgValidador() {
    return this.fgValidador.controls;
  }

  GuardarRegistro() {
    let f_s = this.ObtenerFgValidador.fecha_solicitud.value;
    let oes = this.ObtenerFgValidador.oferta_eco_separarlo.value;
    let est = this.ObtenerFgValidador.estado.value;

    let modelo: SolicitudModelo = new SolicitudModelo();

    modelo.fecha_solicitud = f_s;
    modelo.oferta_eco_separarlo = oes;
    modelo.estado = est;

    this.servicio.AlmacenarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro almacenado correctanente");
        this.router.navigate(["/ventas/listar-solicitudes"]);
      },
      (err) => {
        alert("Error almacenando el registro");
      }
    )
  }
}