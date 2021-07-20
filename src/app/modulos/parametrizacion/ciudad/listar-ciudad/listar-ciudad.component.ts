import { Component, OnInit } from '@angular/core';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { CiudadService } from 'src/app/servicios/ciudad.service';

@Component({
  selector: 'app-listar-ciudad',
  templateUrl: './listar-ciudad.component.html',
  styleUrls: ['./listar-ciudad.component.css']
})
export class ListarCiudadComponent implements OnInit {
  
  pagina: number = 1;

  listaRegistros : CiudadModelo [] = [];

  constructor(private servicio : CiudadService) { }

  ngOnInit(): void {
    this.ObtenerListadoCiudad();
  }

  ObtenerListadoCiudad(){
    this.servicio.ListarRegistros().subscribe(
      (datos) =>{
        this.listaRegistros = datos;
      },
      (err) =>{
        alert("Error cargando el listado de Ciudad");
      }
    );
  }

  CambioPagina(p: number){
    this.pagina = p;
  }

}
