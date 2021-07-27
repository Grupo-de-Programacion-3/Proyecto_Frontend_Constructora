import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../configuracion/datos.generales';
import { SolicitudModelo } from '../modelos/solicitud.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  url: String = DatosGenerales.url;
  token?: String = "";

  constructor(private http: HttpClient,
    private servicioSeguridad: SeguridadService) {

    this.token = this.servicioSeguridad.ObtenerToken();

  }

  ListarRegistros(): Observable<SolicitudModelo[]> {
    return this.http.get<SolicitudModelo[]>(`${this.url}/solicitud`);
  }

  BuscarRegistros(id: number): Observable<SolicitudModelo> {
    return this.http.get<SolicitudModelo>(`${this.url}/solicitud/${id}`);
  }

  AlmacenarRegistro(modelo: SolicitudModelo): Observable<SolicitudModelo> {
    return this.http.post<SolicitudModelo>(
      `${this.url}/solicitud`,
      {
        fecha_solicitud: modelo.fecha_solicitud,
        oferta_eco_separarlo: modelo.oferta_eco_separarlo,
        estado: modelo.estado

      },
      {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });

  }

  ModificarRegistro(modelo: SolicitudModelo): Observable<SolicitudModelo> {
    return this.http.put<SolicitudModelo>(
      `${this.url}/solicitud/${modelo.id_solicitud}`,
      {
        fecha_solicitud: modelo.fecha_solicitud,
        oferta_eco_separarlo: modelo.oferta_eco_separarlo,
        estado: modelo.estado
      },
      {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });

  }

  EliminarRegistro(id: number): Observable<SolicitudModelo> {
    return this.http.delete<SolicitudModelo>(
      `${this.url}/solicitud/${id}`,
      {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });

  }

}