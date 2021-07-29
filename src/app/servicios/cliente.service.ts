import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../configuracion/datos.generales';
import { ClienteModelo } from '../modelos/cliente.modelo';
import { FotografiaClienteModelo } from '../modelos/fotografia.cliente.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url: String = DatosGenerales.url;
  token?: String = "";

  constructor(private http: HttpClient, 
    private servicioSeguridad: SeguridadService) {
      
    this.token = this.servicioSeguridad.ObtenerToken();

  }

  ListarRegistros(): Observable<ClienteModelo[]>{
    return this.http.get<ClienteModelo[]>(`${this.url}/cliente`);
  }

  BuscarRegistros(id : number): Observable<ClienteModelo>{
    return this.http.get<ClienteModelo>(`${this.url}/cliente/${id}`);
  }

  AlmacenarRegistro(modelo: ClienteModelo): Observable<ClienteModelo>{
    return this.http.post<ClienteModelo>(
      `${this.url}/cliente`, 
    {
      documento: modelo.documento,
      nombres: modelo.nombres,
      apellidos: modelo.apellidos,
      fecha_nacimiento: modelo.fecha_nacimiento,
      fotografia: modelo.fotografia,
      num_celular: modelo.num_celular,
      correo: modelo.correo,
      direccion: modelo.direccion
    },
    {
      headers: new HttpHeaders({
        "Authorization":`Bearer ${this.token}`
      })
    });

 }

 ModificarRegistro(modelo: ClienteModelo): Observable<ClienteModelo>{
  return this.http.put<ClienteModelo>(
    `${this.url}/cliente/${modelo.id_cliente}`, 
  {
    documento: modelo.documento,
    nombres: modelo.nombres,
    apellidos: modelo.apellidos,
    fecha_nacimiento: modelo.fecha_nacimiento,
    fotografia: modelo.fotografia,
    num_celular: modelo.num_celular,
    correo: modelo.correo,
    direccion: modelo.direccion
  },
  {
    headers: new HttpHeaders({
      "Authorization":`Bearer ${this.token}`
    })
  });

}

EliminarRegistro(id : number): Observable<ClienteModelo>{
  return this.http.delete<ClienteModelo>(
    `${this.url}/cliente/${id}`, 
  {
    headers: new HttpHeaders({
      "Authorization":`Bearer ${this.token}`
    })
  });

}

CargarArchivo(formData: FormData): Observable<FotografiaClienteModelo> {
  return this.http.post<FotografiaClienteModelo>(
    `${this.url}/CargarFotografiaCliente`,
    formData,
    {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
}


}
