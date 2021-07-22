import { Component, OnInit } from '@angular/core';
import { DatosGenerales } from 'src/app/configuracion/datos.generales';
import { InmuebleModelo } from 'src/app/modelos/inmueble.modelo';
import { InmuebleService } from 'src/app/servicios/inmueble.service';

@Component({
  selector: 'app-listar-inmueble',
  templateUrl: './listar-inmueble.component.html',
  styleUrls: ['./listar-inmueble.component.css']
})
export class ListarInmuebleComponent implements OnInit {

  pagina: number = 1;
  regPorPagina : number = DatosGenerales.numRegistrosPorPagina; 

  listaRegistros : InmuebleModelo [] = [];

  constructor(private servicio : InmuebleService) { }

  ngOnInit(): void {
    this.ObtenerListadoInmueble();
  }

  ObtenerListadoInmueble(){
    this.servicio.ListarRegistros().subscribe(
      (datos) =>{
        this.listaRegistros = datos;
      },
      (err) =>{
        alert("Error cargando el listado de Inmueble");
      }
    );
  }

  CambioPagina(p: number){
    this.pagina = p;
  }

}
