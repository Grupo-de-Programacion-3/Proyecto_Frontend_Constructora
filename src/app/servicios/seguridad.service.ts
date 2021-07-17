import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioModelo } from '../modelos/usuario.modelo';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  constructor(private http: HttpClient) {}

    VerificarUsuario(modelo: UsuarioModelo): Observable<any>{
      return this.http.post<any>(`http://localhost:3000//identificar-usuario`, 
      {
        correo: modelo.correo,
        clave: modelo.clave

      },
      {
        headers: new HttpHeaders({
          
        })
      }
      )

   }
}
