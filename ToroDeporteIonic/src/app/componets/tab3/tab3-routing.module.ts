import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab3Page } from './tab3.page';

const routes: Routes = [
  {
    path: '',
    component: Tab3Page,
  },
  {
    path: 'create',
    loadChildren: () => import('./empleados-update/empleados-update.module').then( m => m.EmpleadosUpdatePageModule)
  },
  {
    path: ':id/edit',
    loadChildren: () => import('./empleados-update/empleados-update.module').then( m => m.EmpleadosUpdatePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab3PageRoutingModule {}
