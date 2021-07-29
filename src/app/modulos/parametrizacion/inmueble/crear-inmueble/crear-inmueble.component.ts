import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InmuebleModelo } from 'src/app/modelos/inmueble.modelo';
import { InmuebleService } from 'src/app/servicios/inmueble.service';
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
  selector: 'app-crear-inmueble',
  templateUrl: './crear-inmueble.component.html',
  styleUrls: ['./crear-inmueble.component.css']
})
export class CrearInmuebleComponent implements OnInit {
  listapaises: PaisModelo[] = [];
  listaciudades: CiudadModelo[]=[];
  listaproyectos: ProyectoModelo[]=[];
  listabloques: BloqueModelo[]=[];
  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio : InmuebleService,
    private router : Router,
    private servicioPais: PaisService,
    private servicioCiudad : CiudadService,
    private servicioProyecto : ProyectoService,
    private servicioBloque : BloqueService) {
    
   }

   ConstruirFormulario(){
     this.fgValidador= this.fb.group({
       codigo: ['',[Validators.required]],
       nombre: ['',[Validators.required]],
       valor: ['',[Validators.required]],
       paisId: ['',[Validators.required]],
       ciudadId: ['',[Validators.required]],
       proyectoId: ['',[Validators.required]],
       bloqueId:['',[Validators.required]]
     });
   }

  ngOnInit(): void {
    this.ConstruirFormulario();
    this.CargarPaises();
    this.cargarCiudadesPorPaises();
    this.cargarProyectosPorCiudades();
    this.cargarBloquesPorProyectos();
    
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


  cargarBloquesPorProyectos(){
    let prId = this.fgValidador.controls.proyectoId.value;
    this.servicioBloque.BuscarRegistrosPorIdproyecto(prId).subscribe(
      (datos) => {
        this.listabloques = datos;
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
    let val = this.ObtenerFgValidador.valor.value;
    let blId = this.ObtenerFgValidador.bloqueId.value;

    let modelo : InmuebleModelo = new InmuebleModelo();

    modelo.codigo = cod;
    modelo.nombre = nom;
    modelo.valor = parseInt(val);
    modelo.bloqueId = parseInt(blId);

    this.servicio.AlmacenarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro almacenado correctamente");
        this.router.navigate(["/parametros/listar-inmuebles"]);
      },
      (err) => {
        alert("Error almacenando el registro");
      }
    )
  }
}
