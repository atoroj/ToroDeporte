import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpleadosUpdatePage } from './empleados-update.page';

const routes: Routes = [
  {
    path: '',
    component: EmpleadosUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpleadosUpdatePageRoutingModule {}
