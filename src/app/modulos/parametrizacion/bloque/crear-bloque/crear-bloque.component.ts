import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BloqueModelo } from 'src/app/modelos/bloque.modelo';
import { BloqueService } from 'src/app/servicios/bloque.service';

@Component({
  selector: 'app-crear-bloque',
  templateUrl: './crear-bloque.component.html',
  styleUrls: ['./crear-bloque.component.css']
})
export class CrearBloqueComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio : BloqueService,
    private router : Router) {
    
   }

   ConstruirFormulario(){
     this.fgValidador= this.fb.group({
       codigo: ['',[Validators.required]],
       nombre: ['',[Validators.required]],
       descripcion: ['',[Validators.required]]
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
    let des = this.ObtenerFgValidador.descripcion.value;

    let modelo : BloqueModelo = new BloqueModelo();

    modelo.codigo = cod;
    modelo.nombre = nom;
    modelo.descripcion = des;

    this.servicio.AlmacenarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro almacenado correctanente");
        this.router.navigate(["/parametros/listar-bloques"]);
      },
      (err) => {
        alert("Error almacenando el registro");
      }
    )
  }
}
