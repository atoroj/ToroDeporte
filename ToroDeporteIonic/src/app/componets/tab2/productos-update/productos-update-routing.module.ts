import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductosUpdatePage } from './productos-update.page';

const routes: Routes = [
  {
    path: '',
    component: ProductosUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductosUpdatePageRoutingModule {}
