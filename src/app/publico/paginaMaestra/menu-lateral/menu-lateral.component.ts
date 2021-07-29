import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(private servicioSeguridad: SeguridadService) { }

  suscripcion: Subscription = new Subscription();

  ngOnInit(): void {
    this.suscripcion = this.servicioSeguridad.ObtenerDatosSesion().subscribe(
      (datos) => {
        this.isLoggedIn = datos.isLoggedIn;
      },
      (error) =>{

      }
    )

  }

}
