import { Component, OnInit } from '@angular/core';
import { DatosGenerales } from 'src/app/configuracion/datos.generales';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelo';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

@Component({
  selector: 'app-listar-proyecto',
  templateUrl: './listar-proyecto.component.html',
  styleUrls: ['./listar-proyecto.component.css']
})
export class ListarProyectoComponent implements OnInit {

  pagina: number = 1;
  regPorPagina : number = DatosGenerales.numRegistrosPorPagina;

  listaRegistros : ProyectoModelo [] = [];

  constructor(private servicio : ProyectoService) { }

  ngOnInit(): void {
    this.ObtenerListadoProyecto();
  }

  ObtenerListadoProyecto(){
    this.servicio.ListarRegistros().subscribe(
      (datos) =>{
        this.listaRegistros = datos;
      },
      (err) =>{
        alert("Error cargando el listado de bloque");
      }
    );
  }

  CambioPagina(p: number){
    this.pagina = p;
  }

}
