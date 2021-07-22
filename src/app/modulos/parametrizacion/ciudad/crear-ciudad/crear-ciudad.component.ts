import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { CiudadService } from 'src/app/servicios/ciudad.service';

@Component({
  selector: 'app-crear-ciudad',
  templateUrl: './crear-ciudad.component.html',
  styleUrls: ['./crear-ciudad.component.css']
})
export class CrearCiudadComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio : CiudadService,
    private router : Router) {
    
   }

   ConstruirFormulario(){
     this.fgValidador= this.fb.group({
       codigo: ['',[Validators.required]],
       nombre: ['',[Validators.required]]
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

    let modelo : CiudadModelo = new CiudadModelo();

    modelo.codigo = cod;
    modelo.nombre = nom;

    this.servicio.AlmacenarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro almacenado correctanente");
        this.router.navigate(["/parametros/listar-ciudades"]);
      },
      (err) => {
        alert("Error almacenando el registro");
      }
    )
  }
}
