import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InmuebleModelo } from 'src/app/modelos/inmueble.modelo';
import { InmuebleService } from 'src/app/servicios/inmueble.service';

@Component({
  selector: 'app-crear-inmueble',
  templateUrl: './crear-inmueble.component.html',
  styleUrls: ['./crear-inmueble.component.css']
})
export class CrearInmuebleComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio : InmuebleService,
    private router : Router) {
    
   }

   ConstruirFormulario(){
     this.fgValidador= this.fb.group({
       codigo: ['',[Validators.required]],
       nombre: ['',[Validators.required]],
       valor: ['',[Validators.required]]
     });
   }

  ngOnInit(): void {
    this.ConstruirFormulario();
  }

  get ObtenerFgValidador(){
    return this.fgValidador.controls;
  }

  GuardarRegistro(){
    let cod = this.ObtenerFgValidador.codigo.value;
    let nom = this.ObtenerFgValidador.nombre.value;
    let val = this.ObtenerFgValidador.valor.value;

    let modelo : InmuebleModelo = new InmuebleModelo();

    modelo.codigo = cod;
    modelo.nombre = nom;
    modelo.valor = parseInt(val);

    this.servicio.AlmacenarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro almacenado correctanente");
        this.router.navigate(["/parametros/listar-inmuebles"]);
      },
      (err) => {
        alert("Error almacenando el registro");
      }
    )
  }
}
