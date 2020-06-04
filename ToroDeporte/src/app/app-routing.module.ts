import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProductoUpdateComponent } from './components/productos/productos-update.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
