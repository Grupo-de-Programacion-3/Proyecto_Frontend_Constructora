import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../configuracion/datos.generales';
import { InformacionFinancieraModelo } from '../modelos/informacionFinanciera.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class InformacionFinancieraService {

  url: String = DatosGenerales.url;
  token?: String = "";

  constructor(private http: HttpClient,
    private servicioSeguridad: SeguridadService) {

    this.token = this.servicioSeguridad.ObtenerToken();

  }

  ListarRegistros(): Observable<InformacionFinancieraModelo[]> {
    return this.http.get<InformacionFinancieraModelo[]>(`${this.url}/informacion-financiera`);
  }

  BuscarRegistros(id: number): Observable<InformacionFinancieraModelo> {
    return this.http.get<InformacionFinancieraModelo>(`${this.url}/informacion-financiera/${id}`);
  }

  AlmacenarRegistro(modelo: InformacionFinancieraModelo): Observable<InformacionFinancieraModelo> {
    return this.http.post<InformacionFinancieraModelo>(
      `${this.url}/informacion-financiera`,
      {
        documento_cliente: modelo.documento_cliente,
        total_ingresos: modelo.total_ingresos,
        empresa_trabaja: modelo.empresa_trabaja,
        cargo: modelo.cargo,
        salario: modelo.salario,
        tiempo_trab_actual: modelo.tiempo_trab_actual,
        nom_ref_familiar: modelo.nom_ref_familiar,
        tel_ref_familiar: modelo.tel_ref_familiar,
        nom_ref_personal: modelo.nom_ref_personal,
        tel_ref_personal: modelo.tel_ref_personal
      },
      {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });

  }

  ModificarRegistro(modelo: InformacionFinancieraModelo): Observable<InformacionFinancieraModelo> {
    return this.http.put<InformacionFinancieraModelo>(
      `${this.url}/informacion-financiera/${modelo.id_informacion_financiera}`,
      {
        documento_cliente: modelo.documento_cliente,
        total_ingresos: modelo.total_ingresos,
        empresa_trabaja: modelo.empresa_trabaja,
        cargo: modelo.cargo,
        salario: modelo.salario,
        tiempo_trab_actual: modelo.tiempo_trab_actual,
        nom_ref_familiar: modelo.nom_ref_familiar,
        tel_ref_familiar: modelo.tel_ref_familiar,
        nom_ref_personal: modelo.nom_ref_personal,
        tel_ref_personal: modelo.tel_ref_personal
      },
      {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });

  }

  EliminarRegistro(id: number): Observable<InformacionFinancieraModelo> {
    return this.http.delete<InformacionFinancieraModelo>(
      `${this.url}/informacion-financiera/${id}`,
      {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });

  }

}