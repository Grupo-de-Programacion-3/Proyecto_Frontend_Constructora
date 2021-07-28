import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InformacionFinancieraModelo } from 'src/app/modelos/informacionFinanciera.modelo';
import { InformacionFinancieraService } from 'src/app/servicios/informacion-financiera.service';

@Component({
  selector: 'app-editar-informacion-financiera',
  templateUrl: './editar-informacion-financiera.component.html',
  styleUrls: ['./editar-informacion-financiera.component.css']
})
export class EditarInformacionFinancieraComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio: InformacionFinancieraService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({

      id: ['', [Validators.required]],
      documento_cliente: ['', [Validators.required]],
      total_ingresos: ['', [Validators.required]],
      empresa_trabaja: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      salario: ['', [Validators.required]],
      tiempo_trab_actual: ['', [Validators.required]],
      nom_ref_familiar: ['', [Validators.required]],
      tel_ref_familiar: ['', [Validators.required]],
      nom_ref_personal: ['', [Validators.required]],
      tel_ref_personal: ['', [Validators.required]]

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

        this.ObtenerFgValidador.id.setValue(datos.id_informacion_financiera);
        this.ObtenerFgValidador.documento_cliente.setValue(datos.documento_cliente);
        this.ObtenerFgValidador.total_ingresos.setValue(datos.total_ingresos);
        this.ObtenerFgValidador.empresa_trabaja.setValue(datos.empresa_trabaja);
        this.ObtenerFgValidador.cargo.setValue(datos.cargo);
        this.ObtenerFgValidador.salario.setValue(datos.salario);
        this.ObtenerFgValidador.tiempo_trab_actual.setValue(datos.tiempo_trab_actual);
        this.ObtenerFgValidador.nom_ref_familiar.setValue(datos.nom_ref_familiar);
        this.ObtenerFgValidador.tel_ref_familiar.setValue(datos.tel_ref_familiar);
        this.ObtenerFgValidador.nom_ref_personal.setValue(datos.nom_ref_personal);
        this.ObtenerFgValidador.tel_ref_personal.setValue(datos.tel_ref_personal);

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
    let d_c = this.ObtenerFgValidador.documento_cliente.value;
    let t_i = this.ObtenerFgValidador.total_ingresos.value;
    let e_t = this.ObtenerFgValidador.empresa_trabaja.value;
    let car = this.ObtenerFgValidador.cargo.value;
    let sal = this.ObtenerFgValidador.salario.value;
    let tta = this.ObtenerFgValidador.tiempo_trab_actual.value;
    let nrf = this.ObtenerFgValidador.nom_ref_familiar.value;
    let trf = this.ObtenerFgValidador.tel_ref_familiar.value;
    let nrp = this.ObtenerFgValidador.nom_ref_personal.value;
    let trp = this.ObtenerFgValidador.tel_ref_personal.value;

    let modelo: InformacionFinancieraModelo = new InformacionFinancieraModelo();

    modelo.id_informacion_financiera = id;
    modelo.documento_cliente = d_c;
    modelo.total_ingresos = parseInt(t_i);
    modelo.empresa_trabaja = e_t;
    modelo.cargo = car;
    modelo.salario = parseInt(sal);
    modelo.tiempo_trab_actual = parseInt(tta);
    modelo.nom_ref_familiar = nrf;
    modelo.tel_ref_familiar = trf;
    modelo.nom_ref_personal = nrp;
    modelo.tel_ref_personal = trp;

    this.servicio.ModificarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro modificado correctanente");
        this.router.navigate(["/ventas/listar-informacionesFinancieras"]);
      },
      (err) => {
        alert("Error modificando el registro");
      }
    )
  }
}
