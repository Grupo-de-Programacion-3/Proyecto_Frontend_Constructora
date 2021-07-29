import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../configuracion/datos.generales';
import { PagoModelo } from '../modelos/pago.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  url: String = DatosGenerales.url;
  token?: String = "";

  constructor(private http: HttpClient,
    private servicioSeguridad: SeguridadService) {

    this.token = this.servicioSeguridad.ObtenerToken();

  }

  ListarRegistros(): Observable<PagoModelo[]> {
    return this.http.get<PagoModelo[]>(`${this.url}/pago`);
  }

  BuscarRegistros(id: number): Observable<PagoModelo> {
    return this.http.get<PagoModelo>(`${this.url}/pago/${id}`);
  }

  AlmacenarRegistro(modelo: PagoModelo): Observable<PagoModelo> {
    return this.http.post<PagoModelo>(
      `${this.url}/pago`,
      {
        valor: modelo.valor,
        fecha_pago: modelo.fecha_pago,
        comprobante_pago: modelo.comprobante_pago

      },
      {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });

  }

  ModificarRegistro(modelo: PagoModelo): Observable<PagoModelo> {
    return this.http.put<PagoModelo>(
      `${this.url}/pago/${modelo.id_pago}`,
      {
        valor: modelo.valor,
        fecha_pago: modelo.fecha_pago,
        comprobante_pago: modelo.comprobante_pago
      },
      {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });

  }

  EliminarRegistro(id: number): Observable<PagoModelo> {
    return this.http.delete<PagoModelo>(
      `${this.url}/pago/${id}`,
      {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });

  }

}