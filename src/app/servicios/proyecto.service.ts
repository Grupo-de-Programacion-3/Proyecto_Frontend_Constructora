import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../configuracion/datos.generales';
import { ProyectoModelo } from '../modelos/proyecto.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  url: String = DatosGenerales.url;
  token?: String = "";

  constructor(private http: HttpClient,
    private servicioSeguridad: SeguridadService) {

    this.token = this.servicioSeguridad.ObtenerToken();

  }

  ListarRegistros(): Observable<ProyectoModelo[]> {
    return this.http.get<ProyectoModelo[]>(`${this.url}/proyecto`);
  }

  BuscarRegistros(id: number): Observable<ProyectoModelo> {
    return this.http.get<ProyectoModelo>(`${this.url}/proyecto/${id}`);
  }
  //revisar
  BuscarRegistrosPorIdciudad(ciudadId: number): Observable<ProyectoModelo[]> {
    return this.http.get<ProyectoModelo[]>(`${this.url}/proyecto/${ciudadId}`);
  }
  BuscarRegistrosProyectoPorIdciudad(ciudadId : number): Observable<ProyectoModelo[]>{
    return this.http.get<ProyectoModelo[]>(`${this.url}/ciudads/${ciudadId}/proyectos`);
  }

  AlmacenarRegistro(modelo: ProyectoModelo): Observable<ProyectoModelo> {
    return this.http.post<ProyectoModelo>(
      `${this.url}/proyecto`,
      {
        codigo: modelo.codigo,
        nombre: modelo.nombre,
        descripcion: modelo.descripcion,
        ciudadId:modelo.ciudadId

      },
      {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });

  }

  ModificarRegistro(modelo: ProyectoModelo): Observable<ProyectoModelo> {
    return this.http.put<ProyectoModelo>(
      `${this.url}/proyecto/${modelo.id_proyecto}`,
      {
        codigo: modelo.codigo,
        nombre: modelo.nombre,
        descripcion: modelo.descripcion,
        ciudadId:modelo.ciudadId

      },
      {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });

  }

  EliminarRegistro(id : number): Observable<ProyectoModelo> {
    return this.http.delete<ProyectoModelo>(
      `${this.url}/proyecto/${id}`,
      {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });

  }

}
