import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InformacionFinancieraModelo } from 'src/app/modelos/informacionFinanciera.modelo';
import { InformacionFinancieraService } from 'src/app/servicios/informacion-financiera.service';

@Component({
  selector: 'app-crear-informacion-financiera',
  templateUrl: './crear-informacion-financiera.component.html',
  styleUrls: ['./crear-informacion-financiera.component.css']
})
export class CrearInformacionFinancieraComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio : InformacionFinancieraService,
    private router : Router) {
    
   }

   ConstruirFormulario(){
     this.fgValidador= this.fb.group({
      documento_cliente: ['',[Validators.required]],
      total_ingresos: ['',[Validators.required]],
      empresa_trabaja: ['',[Validators.required]],
      cargo: ['',[Validators.required]],
      salario: ['',[Validators.required]],
      tiempo_trab_actual: ['',[Validators.required]],
      nom_ref_familiar: ['',[Validators.required]],
      tel_ref_familiar: ['',[Validators.required]],
      nom_ref_personal: ['',[Validators.required]],
      tel_ref_personal: ['',[Validators.required]]
     });
   }

  ngOnInit(): void {
    this.ConstruirFormulario();
  }

  get ObtenerFgValidador(){
    return this.fgValidador.controls;
  }

  GuardarRegistro(){

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

    let modelo : InformacionFinancieraModelo = new InformacionFinancieraModelo();

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

    this.servicio.AlmacenarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro almacenado correctanente");
        this.router.navigate(["/ventas/listar-informacionesFinancieras"]);
      },
      (err) => {
        alert("Error almacenando el registro");
      }
    )
  }
}
