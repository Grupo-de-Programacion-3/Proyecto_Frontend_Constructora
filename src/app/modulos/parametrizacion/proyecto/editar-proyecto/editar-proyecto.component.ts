import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelo';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { PaisService } from 'src/app/servicios/pais.service';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { PaisModelo } from 'src/app/modelos/pais.modelo';

declare var IniciarSelect: any;

@Component({
  selector: 'app-editar-proyecto',
  templateUrl: './editar-proyecto.component.html',
  styleUrls: ['./editar-proyecto.component.css']
})
export class EditarProyectoComponent implements OnInit {
  listapaises: PaisModelo[] = [];
  listaciudades: CiudadModelo[]=[];
  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio : ProyectoService,
    private router : Router,
    private route : ActivatedRoute,
    private servicioPais: PaisService,
    private servicioCiudad : CiudadService) {
    
   }

   ConstruirFormulario(){
     this.fgValidador= this.fb.group({
       id: ['',[Validators.required]],
       codigo: ['',[Validators.required]],
       nombre: ['',[Validators.required]],
       descripcion: ['',[Validators.required]],
       paisId: ['',[Validators.required]],
       ciudadId: ['',[Validators.required]]
     });
   }

  ngOnInit(): void {
    this.ConstruirFormulario();
    let id = this.route.snapshot.params["id"];
    this.ObtenerRegistroPorId(id);
    this.CargarPaises();
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
    this.servicioCiudad.BuscarRegistrosPorIdPais(this.fgValidador.controls.paisId.value).subscribe(
      (datos) => {
        this.listaciudades = datos;
        setTimeout (() =>{
          IniciarSelect();
        }, 500);
      }
    );
  }

  ObtenerRegistroPorId(id : number){
    this.servicio.BuscarRegistros(id).subscribe(
      (datos) =>{
        this.ObtenerFgValidador.id.setValue(datos.id_proyecto);
        this.ObtenerFgValidador.codigo.setValue(datos.codigo);
        this.ObtenerFgValidador.nombre.setValue(datos.nombre);
        this.ObtenerFgValidador.descripcion.setValue(datos.descripcion);
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
    let ciu = this.ObtenerFgValidador.ciudadId.value;
    

    let modelo : ProyectoModelo = new ProyectoModelo();

    modelo.id_proyecto = parseInt(id);
    modelo.codigo = cod;
    modelo.nombre = nom;
    modelo.descripcion = des;
    modelo.ciudadId= parseInt(ciu);

    this.servicio.ModificarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro modificado correctanente");
        this.router.navigate(["/parametros/listar-proyectos"]);
      },
      (err) => {
        alert("Error modificando el registro");
      }
    )
  }
}
