import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidadorSesionGuard } from 'src/app/guardianes/validador-sesion.guard';
import { CrearClienteComponent } from './cliente/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './cliente/editar-cliente/editar-cliente.component';
import { EliminarClienteComponent } from './cliente/eliminar-cliente/eliminar-cliente.component';
import { CrearInformacionFinancieraComponent } from './cliente/informacionFinanciera/crear-informacion-financiera/crear-informacion-financiera.component';
import { EditarInformacionFinancieraComponent } from './cliente/informacionFinanciera/editar-informacion-financiera/editar-informacion-financiera.component';
import { EliminarInformacionFinancieraComponent } from './cliente/informacionFinanciera/eliminar-informacion-financiera/eliminar-informacion-financiera.component';
import { ListarInformacionFinancieraComponent } from './cliente/informacionFinanciera/listar-informacion-financiera/listar-informacion-financiera.component';
import { ListarClienteComponent } from './cliente/listar-cliente/listar-cliente.component';
import { CrearPagoComponent } from './pago/crear-pago/crear-pago.component';
import { EditarPagoComponent } from './pago/editar-pago/editar-pago.component';
import { EliminarPagoComponent } from './pago/eliminar-pago/eliminar-pago.component';
import { ListarPagoComponent } from './pago/listar-pago/listar-pago.component';
import { CrearSolicitudComponent } from './solicitud/crear-solicitud/crear-solicitud.component';
import { EditarSolicitudComponent } from './solicitud/editar-solicitud/editar-solicitud.component';
import { EliminarSolicitudComponent } from './solicitud/eliminar-solicitud/eliminar-solicitud.component';
import { ListarSolicitudComponent } from './solicitud/listar-solicitud/listar-solicitud.component';

const routes: Routes = [
  {
    path: 'listar-clientes',
    component: ListarClienteComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'crear-clientes',
    component: CrearClienteComponent,
    canActivate: [ValidadorSesionGuard]

  },
  {
    path: 'editar-clientes/:id',
    component: EditarClienteComponent,
    canActivate: [ValidadorSesionGuard]

  },
  {
    path: 'eliminar-clientes/:id',
    component: EliminarClienteComponent,
    canActivate: [ValidadorSesionGuard]

  },
  {
    path: 'listar-informacionesFinancieras',
    component: ListarInformacionFinancieraComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'crear-informacionesFinancieras',
    component: CrearInformacionFinancieraComponent,
    canActivate: [ValidadorSesionGuard]

  },
  {
    path: 'editar-informacionesFinancieras/:id',
    component: EditarInformacionFinancieraComponent,
    canActivate: [ValidadorSesionGuard]

  },
  {
    path: 'eliminar-informacionesFinancieras/:id',
    component: EliminarInformacionFinancieraComponent,
    canActivate: [ValidadorSesionGuard]

  },
  {
    path: 'listar-pagos',
    component: ListarPagoComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'crear-pagos',
    component: CrearPagoComponent,
    canActivate: [ValidadorSesionGuard]

  },
  {
    path: 'editar-pagos/:id',
    component: EditarPagoComponent,
    canActivate: [ValidadorSesionGuard]

  },
  {
    path: 'eliminar-pagos/:id',
    component: EliminarPagoComponent,
    canActivate: [ValidadorSesionGuard]

  },
  {
    path: 'listar-solicitudes',
    component: ListarSolicitudComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'crear-solicitudes',
    component: CrearSolicitudComponent,
    canActivate: [ValidadorSesionGuard]

  },
  {
    path: 'editar-solicitudes/:id',
    component: EditarSolicitudComponent,
    canActivate: [ValidadorSesionGuard]

  },
  {
    path: 'eliminar-solicitudes/:id',
    component: EliminarSolicitudComponent,
    canActivate: [ValidadorSesionGuard]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentaRoutingModule { }
