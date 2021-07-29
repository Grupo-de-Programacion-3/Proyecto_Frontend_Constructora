import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { PaisModelo } from 'src/app/modelos/pais.modelo';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelo';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { PaisService } from 'src/app/servicios/pais.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

declare var IniciarSelect: any;

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.css']
})
export class CrearProyectoComponent implements OnInit {

  listapaises: PaisModelo[] = [];
  listaciudades: CiudadModelo[]=[];
  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio : ProyectoService,
    private router : Router,
    private servicioPais: PaisService,
    private servicioCiudad : CiudadService) {
    
   }

   ConstruirFormulario(){
     this.fgValidador= this.fb.group({
       codigo: ['',[Validators.required]],
       nombre: ['',[Validators.required]],
       descripcion: ['',[Validators.required]],
       paisId: ['',[Validators.required]],
       ciudadId: ['',[Validators.required]]
     });
   }

  ngOnInit(): void {
    this.ConstruirFormulario();
    this.CargarPaises();
    this.cargarCiudadesPorPaises();
    
      
  }

  CargarPaises(){
    this.servicioPais.ListarRegistros().subscribe(
      (datos) => {
        this.listapaises = datos;
        setTimeout (() =>{
          IniciarSelect();
        }, 500);
      }
    );
  }

  cargarCiudadesPorPaises(){
    let pId = this.fgValidador.controls.paisId.value;
    this.servicioCiudad.BuscarRegistrosPorIdPais(pId).subscribe(
      (datos) => {
        this.listaciudades = datos;

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
    let des = this.ObtenerFgValidador.descripcion.value;
    let ciu = this.ObtenerFgValidador.ciudadId.value;

    

    let modelo : ProyectoModelo = new ProyectoModelo();

    modelo.codigo = cod;
    modelo.nombre = nom;
    modelo.descripcion = des;
    modelo.ciudadId= parseInt(ciu);

    this.servicio.AlmacenarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro almacenado correctanente");
        this.router.navigate(["/parametros/listar-proyectos"]);
      },
      (err) => {
        alert("Error almacenando el registro");
      }
    )
  }
}
