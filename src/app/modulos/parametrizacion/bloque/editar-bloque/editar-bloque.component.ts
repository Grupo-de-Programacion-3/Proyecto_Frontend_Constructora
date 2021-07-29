import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-editar-bloque',
  templateUrl: './editar-bloque.component.html',
  styleUrls: ['./editar-bloque.component.css']
})
export class EditarBloqueComponent implements OnInit {
  listapaises: PaisModelo[] = [];
  listaciudades: CiudadModelo[]=[];
  listaproyectos: ProyectoModelo[]=[];
  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio : BloqueService,
    private router : Router,
    private route : ActivatedRoute,
    private servicioPais: PaisService,
    private servicioCiudad : CiudadService,
    private servicioProyecto : ProyectoService) {
    
   }

   ConstruirFormulario(){
     this.fgValidador= this.fb.group({
       id: ['',[Validators.required]],
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
    let id = this.route.snapshot.params["id"];
    this.ObtenerRegistroPorId(id);
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


  ObtenerRegistroPorId(id : number){
    this.servicio.BuscarRegistros(id).subscribe(
      (datos) =>{
        this.ObtenerFgValidador.id.setValue(datos.id_bloque);
        this.ObtenerFgValidador.codigo.setValue(datos.codigo);
        this.ObtenerFgValidador.nombre.setValue(datos.nombre);
        this.ObtenerFgValidador.descripcion.setValue(datos.descripcion);
        this.ObtenerFgValidador.idproyecto.setValue(datos.proyectoId)
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
    let cod = this.ObtenerFgValidador.codigo.value;
    let nom = this.ObtenerFgValidador.nombre.value;
    let des = this.ObtenerFgValidador.descripcion.value;
    let prId = this.ObtenerFgValidador.proyectoId.value;

    let modelo : BloqueModelo = new BloqueModelo();

    modelo.id_bloque = parseInt(id);
    modelo.codigo = cod;
    modelo.nombre = nom;
    modelo.descripcion = des;
    modelo.proyectoId =parseInt(prId);

    this.servicio.ModificarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro modificado correctamente");
        this.router.navigate(["/parametros/listar-bloques"]);
      },
      (err) => {
        alert("Error modificando el registro");
      }
    )
  }
}
