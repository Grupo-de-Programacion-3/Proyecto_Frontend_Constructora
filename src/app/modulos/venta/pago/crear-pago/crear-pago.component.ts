import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PagoModelo } from 'src/app/modelos/pago.modelo';
import { PagoService } from 'src/app/servicios/pago.service';

@Component({
  selector: 'app-crear-pago',
  templateUrl: './crear-pago.component.html',
  styleUrls: ['./crear-pago.component.css']
})
export class CrearPagoComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio : PagoService,
    private router : Router) {
    
   }

   ConstruirFormulario(){
     this.fgValidador= this.fb.group({
       valor: ['',[Validators.required]],
       fecha_pago: ['',[Validators.required]],
       comprobante_pago: ['',[Validators.required]]
     });
   }

  ngOnInit(): void {
    this.ConstruirFormulario();
  }

  get ObtenerFgValidador(){
    return this.fgValidador.controls;
  }

  GuardarRegistro(){

    let val = this.ObtenerFgValidador.valor.value;
    let f_p = this.ObtenerFgValidador.fecha_pago.value;
    let c_p = this.ObtenerFgValidador.comprobante_pago.value;

    let modelo : PagoModelo = new PagoModelo();

    modelo.valor = val;
    modelo.fecha_pago = f_p;
    modelo.comprobante_pago = c_p;

    this.servicio.AlmacenarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro almacenado correctanente");
        this.router.navigate(["/ventas/listar-pagos"]);
      },
      (err) => {
        alert("Error almacenando el registro");
      }
    )
  }
}
