import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpleadosUpdatePageRoutingModule } from './empleados-update-routing.module';

import { EmpleadosUpdatePage } from './empleados-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpleadosUpdatePageRoutingModule
  ],
  declarations: [EmpleadosUpdatePage]
})
export class EmpleadosUpdatePageModule {}
