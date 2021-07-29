import { Component, OnInit } from '@angular/core';
import { DatosGenerales } from 'src/app/configuracion/datos.generales';
import { InformacionFinancieraModelo } from 'src/app/modelos/informacionFinanciera.modelo';
import { InformacionFinancieraService } from 'src/app/servicios/informacion-financiera.service';

@Component({
  selector: 'app-listar-informacion-financiera',
  templateUrl: './listar-informacion-financiera.component.html',
  styleUrls: ['./listar-informacion-financiera.component.css']
})
export class ListarInformacionFinancieraComponent implements OnInit {

  pagina: number = 1;
  regPorPagina : number = DatosGenerales.numRegistrosPorPagina;

  listaRegistros : InformacionFinancieraModelo [] = [];

  constructor(private servicio : InformacionFinancieraService) { }

  ngOnInit(): void {
    this.ObtenerListado();
  }

  ObtenerListado(){
    this.servicio.ListarRegistros().subscribe(
      (datos) =>{
        this.listaRegistros = datos;
      },
      (err) =>{
        alert("Error cargando el listado de cliente");
      }
    );
  }

  CambioPagina(p: number){
    this.pagina = p;
  }

}
