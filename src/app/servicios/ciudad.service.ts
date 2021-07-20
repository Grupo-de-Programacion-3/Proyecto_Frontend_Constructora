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

  BuscarRegistros(id : number): Observable<CiudadModelo[]>{
    return this.http.get<CiudadModelo[]>(`${this.url}/ciudad/${id}`);
  }

  AlmacenarRegistro(modelo: CiudadModelo): Observable<CiudadModelo>{
    return this.http.post<CiudadModelo>(
      `${this.url}/ciudad`, 
    {
      nombre: modelo.nombre,
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
    nombre: modelo.nombre,
  },
  {
    headers: new HttpHeaders({
      "Authorization":`Bearer ${this.token}`
    })
  });

}

EliminarRegistro(modelo: CiudadModelo): Observable<CiudadModelo>{
  return this.http.delete<CiudadModelo>(
    `${this.url}/ciudad/${modelo.id_ciudad}`, 
  {
    headers: new HttpHeaders({
      "Authorization":`Bearer ${this.token}`
    })
  });

}

}
