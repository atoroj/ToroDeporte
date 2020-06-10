import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProductoUpdateComponent } from './components/productos/productos-update.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { EmpleadoUpdateComponent } from './components/empleados/empleados-update.component';
import { ContrasenaComponent } from './components/contrasena/contrasena.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'productos',
    component: ProductosComponent
  },
  {
    path: 'productos/form/create',
    component: ProductoUpdateComponent
  },
  {
    path: 'productos/form/:id/edit',
    component: ProductoUpdateComponent
  },
  {
    path: 'productos/form/:id/view',
    component: ProductoUpdateComponent
  },
  {
    path: 'empleados',
    component: EmpleadosComponent
  },
  {
    path: 'empleados/form/create',
    component: EmpleadoUpdateComponent
  },
  {
    path: 'empleados/form/:id/edit',
    component: EmpleadoUpdateComponent
  },
  {
    path: 'empleados/form/:id/view',
    component: EmpleadoUpdateComponent
  },
  {
    path: 'password/change',
    component: ContrasenaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
