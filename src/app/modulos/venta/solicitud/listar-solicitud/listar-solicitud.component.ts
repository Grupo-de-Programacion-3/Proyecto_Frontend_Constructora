import { Component, OnInit } from '@angular/core';
import { DatosGenerales } from 'src/app/configuracion/datos.generales';
import { SolicitudModelo } from 'src/app/modelos/solicitud.modelo';
import { SolicitudService } from 'src/app/servicios/solicitud.service';

@Component({
  selector: 'app-listar-solicitud',
  templateUrl: './listar-solicitud.component.html',
  styleUrls: ['./listar-solicitud.component.css']
})
export class ListarSolicitudComponent implements OnInit {

  pagina: number = 1;
  regPorPagina : number = DatosGenerales.numRegistrosPorPagina;

  listaRegistros : SolicitudModelo [] = [];

  constructor(private servicio : SolicitudService) { }

  ngOnInit(): void {
    this.ObtenerListado();
  }

  ObtenerListado(){
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
