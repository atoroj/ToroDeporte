import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductosUpdatePageRoutingModule } from './productos-update-routing.module';

import { ProductosUpdatePage } from './productos-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductosUpdatePageRoutingModule
  ],
  declarations: [ProductosUpdatePage]
})
export class ProductosUpdatePageModule {}
