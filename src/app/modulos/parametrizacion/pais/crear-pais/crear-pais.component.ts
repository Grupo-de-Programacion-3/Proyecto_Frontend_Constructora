import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaisModelo } from 'src/app/modelos/pais.modelo';
import { PaisService } from 'src/app/servicios/pais.service';

@Component({
  selector: 'app-crear-pais',
  templateUrl: './crear-pais.component.html',
  styleUrls: ['./crear-pais.component.css']
})
export class CrearPaisComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio : PaisService,
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

    let modelo : PaisModelo = new PaisModelo();

    modelo.codigo = cod;
    modelo.nombre = nom;

    this.servicio.AlmacenarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro almacenado correctanente");
        this.router.navigate(["/parametros/listar-paises"]);
      },
      (err) => {
        alert("Error almacenando el registro");
      }
    )
  }
}
