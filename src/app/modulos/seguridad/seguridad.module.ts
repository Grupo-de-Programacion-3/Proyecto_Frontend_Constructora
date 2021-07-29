import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguridadRoutingModule } from './seguridad-routing.module';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { ResetearClaveComponent } from './resetear-clave/resetear-clave.component';
import { CambiarClaveComponent } from './cambiar-clave/cambiar-clave.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';



@NgModule({
  declarations: [
    CerrarSesionComponent,
    ResetearClaveComponent,
    CambiarClaveComponent,
    IniciarSesionComponent
  ],
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaFormsModule,
    RecaptchaModule,

  ]
})
export class SeguridadModule { }
