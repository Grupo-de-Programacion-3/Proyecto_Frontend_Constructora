import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidadorSesionGuard } from 'src/app/guardianes/validador-sesion.guard';
import { CrearBloqueComponent } from './bloque/crear-bloque/crear-bloque.component';
import { EditarBloqueComponent } from './bloque/editar-bloque/editar-bloque.component';
import { EliminarBloqueComponent } from './bloque/eliminar-bloque/eliminar-bloque.component';
import { ListarBloqueComponent } from './bloque/listar-bloque/listar-bloque.component';
import { CrearCiudadComponent } from './ciudad/crear-ciudad/crear-ciudad.component';
import { EditarCiudadComponent } from './ciudad/editar-ciudad/editar-ciudad.component';
import { EliminarCiudadComponent } from './ciudad/eliminar-ciudad/eliminar-ciudad.component';
import { ListarCiudadComponent } from './ciudad/listar-ciudad/listar-ciudad.component';
import { CrearInmuebleComponent } from './inmueble/crear-inmueble/crear-inmueble.component';
import { EditarInmuebleComponent } from './inmueble/editar-inmueble/editar-inmueble.component';
import { EliminarInmuebleComponent } from './inmueble/eliminar-inmueble/eliminar-inmueble.component';
import { ListarInmuebleComponent } from './inmueble/listar-inmueble/listar-inmueble.component';
import { CrearPaisComponent } from './pais/crear-pais/crear-pais.component';
import { EditarPaisComponent } from './pais/editar-pais/editar-pais.component';
import { EliminarPaisComponent } from './pais/eliminar-pais/eliminar-pais.component';
import { ListarPaisComponent } from './pais/listar-pais/listar-pais.component';
import { CrearProyectoComponent } from './proyecto/crear-proyecto/crear-proyecto.component';
import { EditarProyectoComponent } from './proyecto/editar-proyecto/editar-proyecto.component';
import { EliminarProyectoComponent } from './proyecto/eliminar-proyecto/eliminar-proyecto.component';
import { ListarProyectoComponent } from './proyecto/listar-proyecto/listar-proyecto.component';

const routes: Routes = [
  {
    path : 'listar-bloques',
    component : ListarBloqueComponent,
    canActivate : [ValidadorSesionGuard]
  },
  {
    path : 'crear-bloques',
    component : CrearBloqueComponent,
    canActivate : [ValidadorSesionGuard]

  },
  {
    path : 'editar-bloques/:id',
    component : EditarBloqueComponent,
    canActivate : [ValidadorSesionGuard]

  },
  {
    path : 'eliminar-bloques/:id',
    component : EliminarBloqueComponent,
    canActivate : [ValidadorSesionGuard]

  },
  {
    path : 'listar-ciudades',
    component : ListarCiudadComponent,
    canActivate : [ValidadorSesionGuard]

  },
  {
    path : 'crear-ciudades',
    component : CrearCiudadComponent,
    canActivate : [ValidadorSesionGuard]

  },
  {
    path : 'editar-ciudades/:id',
    component : EditarCiudadComponent,
    canActivate : [ValidadorSesionGuard]

  },
  {
    path : 'eliminar-ciudades/:id',
    component : EliminarCiudadComponent,
    canActivate : [ValidadorSesionGuard]

  },
  {
    path : 'listar-inmuebles',
    component : ListarInmuebleComponent,
    canActivate : [ValidadorSesionGuard]

  },
  {
    path : 'crear-inmuebles',
    component : CrearInmuebleComponent,
    canActivate : [ValidadorSesionGuard]

  },
  {
    path : 'editar-inmuebles/:id',
    component : EditarInmuebleComponent,
    canActivate : [ValidadorSesionGuard]

  },
  {
    path : 'eliminar-inmuebles/:id',
    component : EliminarInmuebleComponent,
    canActivate : [ValidadorSesionGuard]

  },
  {
    path : 'listar-paises',
    component : ListarPaisComponent,
    canActivate : [ValidadorSesionGuard]

  },
  {
    path : 'crear-paises',
    component : CrearPaisComponent,
    canActivate : [ValidadorSesionGuard]

  },
  {
    path : 'editar-paises/:id',
    component : EditarPaisComponent,
    canActivate : [ValidadorSesionGuard]

  },
  {
    path : 'eliminar-paises/:id',
    component : EliminarPaisComponent,
    canActivate : [ValidadorSesionGuard]

  },
  {
    path : 'listar-proyectos',
    component : ListarProyectoComponent,
    canActivate : [ValidadorSesionGuard]

  },
  {
    path : 'crear-proyectos',
    component : CrearProyectoComponent,
    canActivate : [ValidadorSesionGuard]

  },
  {
    path : 'editar-proyectos/:id',
    component : EditarProyectoComponent,
    canActivate : [ValidadorSesionGuard]

  },
  {
    path : 'eliminar-proyectos/:id',
    component : EliminarProyectoComponent,
    canActivate : [ValidadorSesionGuard]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrizacionRoutingModule { }
