import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PagoModelo } from 'src/app/modelos/pago.modelo';
import { PagoService } from 'src/app/servicios/pago.service';

@Component({
  selector: 'app-editar-pago',
  templateUrl: './editar-pago.component.html',
  styleUrls: ['./editar-pago.component.css']
})
export class EditarPagoComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio : PagoService,
    private router : Router,
    private route : ActivatedRoute) {
    
   }

   ConstruirFormulario(){
     this.fgValidador= this.fb.group({
       id: ['',[Validators.required]],
       valor: ['',[Validators.required]],
       fecha_pago: ['',[Validators.required]],
       comprobante_pago: ['',[Validators.required]]
     });
   }

  ngOnInit(): void {
    this.ConstruirFormulario();
    let id = this.route.snapshot.params["id"];
    this.ObtenerRegistroPorId(id);
  }

  ObtenerRegistroPorId(id : number){
    this.servicio.BuscarRegistros(id).subscribe(
      (datos) =>{
        this.ObtenerFgValidador.id.setValue(datos.id_pago);
        this.ObtenerFgValidador.valor.setValue(datos.valor);
        this.ObtenerFgValidador.fecha_pago.setValue(datos.fecha_pago);
        this.ObtenerFgValidador.comprobante_pago.setValue(datos.comprobante_pago);
      },
      (err) => {
        alert("No se encuentra el registro con id " + id)
      }
    )
  }

  get ObtenerFgValidador(){
    return this.fgValidador.controls;
  }

  ModificarRegistro(){

    let id = this.ObtenerFgValidador.id.value;
    let val = this.ObtenerFgValidador.valor.value;
    let f_p = this.ObtenerFgValidador.fecha_pago.value;
    let c_p = this.ObtenerFgValidador.comprobante_pago.value;

    let modelo : PagoModelo = new PagoModelo();

    modelo.id_pago = id;
    modelo.valor = val;
    modelo.fecha_pago = f_p;
    modelo.comprobante_pago = c_p;

    this.servicio.ModificarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro modificado correctanente");
        this.router.navigate(["/ventas/listar-pagos"]);
      },
      (err) => {
        alert("Error modificando el registro");
      }
    )
  }
}
