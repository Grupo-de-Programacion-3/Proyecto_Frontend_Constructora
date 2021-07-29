import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentaRoutingModule } from './venta-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrearSolicitudComponent } from './solicitud/crear-solicitud/crear-solicitud.component';
import { EditarSolicitudComponent } from './solicitud/editar-solicitud/editar-solicitud.component';
import { EliminarSolicitudComponent } from './solicitud/eliminar-solicitud/eliminar-solicitud.component';
import { ListarSolicitudComponent } from './solicitud/listar-solicitud/listar-solicitud.component';
import { AprobarRechazarSolicitudComponent } from './solicitud/aprobar-rechazar-solicitud/aprobar-rechazar-solicitud.component';
import { CrearClienteComponent } from './cliente/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './cliente/editar-cliente/editar-cliente.component';
import { EliminarClienteComponent } from './cliente/eliminar-cliente/eliminar-cliente.component';
import { ListarClienteComponent } from './cliente/listar-cliente/listar-cliente.component';
import { CrearInformacionFinancieraComponent } from './cliente/informacionFinanciera/crear-informacion-financiera/crear-informacion-financiera.component';
import { EditarInformacionFinancieraComponent } from './cliente/informacionFinanciera/editar-informacion-financiera/editar-informacion-financiera.component';
import { EliminarInformacionFinancieraComponent } from './cliente/informacionFinanciera/eliminar-informacion-financiera/eliminar-informacion-financiera.component';
import { ListarInformacionFinancieraComponent } from './cliente/informacionFinanciera/listar-informacion-financiera/listar-informacion-financiera.component';
import { CrearPagoComponent } from './pago/crear-pago/crear-pago.component';
import { EditarPagoComponent } from './pago/editar-pago/editar-pago.component';
import { EliminarPagoComponent } from './pago/eliminar-pago/eliminar-pago.component';
import { ListarPagoComponent } from './pago/listar-pago/listar-pago.component';

@NgModule({
  declarations: [
    CrearSolicitudComponent,
    EditarSolicitudComponent,
    EliminarSolicitudComponent,
    ListarSolicitudComponent,
    AprobarRechazarSolicitudComponent,
    CrearClienteComponent,
    EditarClienteComponent,
    EliminarClienteComponent,
    ListarClienteComponent,
    CrearInformacionFinancieraComponent,
    EditarInformacionFinancieraComponent,
    EliminarInformacionFinancieraComponent,
    ListarInformacionFinancieraComponent,
    CrearPagoComponent,
    EditarPagoComponent,
    EliminarPagoComponent,
    ListarPagoComponent
  ],
  imports: [
    CommonModule,
    VentaRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class VentaModule { }
