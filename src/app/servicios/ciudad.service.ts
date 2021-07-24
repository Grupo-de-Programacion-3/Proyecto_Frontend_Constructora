import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../configuracion/datos.generales';
import { CiudadModelo } from '../modelos/ciudad.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  url: String = DatosGenerales.url;
  token?: String = "";

  constructor(private http: HttpClient, 
    private servicioSeguridad: SeguridadService) {
      
    this.token = this.servicioSeguridad.ObtenerToken();

  }

  ListarRegistros(): Observable<CiudadModelo[]>{
    return this.http.get<CiudadModelo[]>(`${this.url}/ciudad`);
  }

  BuscarRegistros(id : number): Observable<CiudadModelo>{
    return this.http.get<CiudadModelo>(`${this.url}/ciudad/${id}`);
  }

  BuscarRegistrosPorIdPais(paisId : number): Observable<CiudadModelo>{
    return this.http.get<CiudadModelo>(`${this.url}//pais/${paisId}/ciudads`);
  }

  AlmacenarRegistro(modelo: CiudadModelo): Observable<CiudadModelo>{
    return this.http.post<CiudadModelo>(
      `${this.url}/ciudad`, 
    {
      codigo: modelo.codigo,
      nombre: modelo.nombre,
      paisId: modelo.paisId
    },
    {
      headers: new HttpHeaders({
        "Authorization":`Bearer ${this.token}`
      })
    });

 }

 ModificarRegistro(modelo: CiudadModelo): Observable<CiudadModelo>{
  return this.http.put<CiudadModelo>(
    `${this.url}/ciudad/${modelo.id_ciudad}`, 
  {
      codigo: modelo.codigo,
      nombre: modelo.nombre
  },
  {
    headers: new HttpHeaders({
      "Authorization":`Bearer ${this.token}`
    })
  });

}

EliminarRegistro(id : number): Observable<CiudadModelo>{
  return this.http.delete<CiudadModelo>(
    `${this.url}/ciudad/${id}`, 
  {
    headers: new HttpHeaders({
      "Authorization":`Bearer ${this.token}`
    })
  });

}

}
