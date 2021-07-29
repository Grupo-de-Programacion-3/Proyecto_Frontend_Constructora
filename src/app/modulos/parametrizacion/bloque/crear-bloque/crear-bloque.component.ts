import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BloqueModelo } from 'src/app/modelos/bloque.modelo';
import { BloqueService } from 'src/app/servicios/bloque.service';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { PaisModelo } from 'src/app/modelos/pais.modelo';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelo';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { PaisService } from 'src/app/servicios/pais.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

declare var IniciarSelect: any;

@Component({
  selector: 'app-crear-bloque',
  templateUrl: './crear-bloque.component.html',
  styleUrls: ['./crear-bloque.component.css']
})
export class CrearBloqueComponent implements OnInit {

  listapaises: PaisModelo[] = [];
  listaciudades: CiudadModelo[]=[];
  listaproyectos: ProyectoModelo[]=[];
  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio : BloqueService,
    private router : Router,
    private servicioPais: PaisService,
    private servicioCiudad : CiudadService,
    private servicioProyecto : ProyectoService) {
    
   }

   ConstruirFormulario(){
     this.fgValidador= this.fb.group({
       codigo: ['',[Validators.required]],
       nombre: ['',[Validators.required]],
       descripcion: ['',[Validators.required]],
       paisId: ['',[Validators.required]],
       ciudadId: ['',[Validators.required]],
       proyectoId: ['',[Validators.required]]
     });
   }

  ngOnInit(): void {
    this.ConstruirFormulario();
    this.CargarPaises();
    this.cargarCiudadesPorPaises();
    this.cargarProyectosPorCiudades();
    
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

  cargarProyectosPorCiudades(){
    let cdId = this.fgValidador.controls.ciudadId.value;
    this.servicioProyecto.BuscarRegistrosProyectoPorIdciudad(cdId).subscribe(
      (datos) => {
        this.listaproyectos = datos;
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
    let proyId= this.ObtenerFgValidador.proyectoId.value;

    let modelo : BloqueModelo = new BloqueModelo();

    modelo.codigo = cod;
    modelo.nombre = nom;
    modelo.descripcion = des;
    modelo.proyectoId = parseInt(proyId);

    this.servicio.AlmacenarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro almacenado correctamente");
        this.router.navigate(["/parametros/listar-bloques"]);
      },
      (err) => {
        alert("Error almacenando el registro");
      }
    )
  }
}
