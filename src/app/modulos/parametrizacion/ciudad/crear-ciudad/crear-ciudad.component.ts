import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { PaisModelo } from 'src/app/modelos/pais.modelo';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { PaisService } from 'src/app/servicios/pais.service';


declare var IniciarSelect: any;

@Component({
  selector: 'app-crear-ciudad',
  templateUrl: './crear-ciudad.component.html',
  styleUrls: ['./crear-ciudad.component.css']
})
export class CrearCiudadComponent implements OnInit {

  listapaises:PaisModelo[] = [];
  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio : CiudadService,
    private router : Router,
    private servicioPaises : PaisService) {
    
   }

   ConstruirFormulario(){
     this.fgValidador= this.fb.group({
       codigo: ['',[Validators.required]],
       nombre: ['',[Validators.required]],
       paisId: ['',[Validators.required]]
     });
   }

  ngOnInit(): void {
    this.ConstruirFormulario();
    this.CargarPaises();
      }

      CargarPaises(){
        this.servicioPaises.ListarRegistros().subscribe(
          (datos) => {
            this.listapaises = datos;
            setTimeout (() =>{
              IniciarSelect();
            }, 500);
          }
        );
      }

  get ObtenerFgValidador(){
    return this.fgValidador.controls;
  }

  GuardarRegistro(){
    let cod = this.ObtenerFgValidador.codigo.value;
    let nom = this.ObtenerFgValidador.nombre.value;
    let pais = this.ObtenerFgValidador.paisId.value;

    let modelo : CiudadModelo = new CiudadModelo();

    modelo.codigo = cod;
    modelo.nombre = nom;
    modelo.paisId= parseInt(pais);

    this.servicio.AlmacenarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro almacenado correctamente");
        this.router.navigate(["/parametros/listar-ciudades"]);
      },
      (err) => {
        alert("Error almacenando el registro");
      }
    )
  }
}
