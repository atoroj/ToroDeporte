import { Component, OnInit } from '@angular/core';
import { Empleado, Rol } from 'src/app/model/empleados.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import swal from 'sweetalert2';
import { NavController } from '@ionic/angular';
import { EmpleadosService } from '../empleados.service';

@Component({
  selector: 'app-empleados-update',
  templateUrl: './empleados-update.page.html',
  styleUrls: ['./empleados-update.page.scss'],
})
export class EmpleadosUpdatePage implements OnInit {
  empleado: Empleado;
  idEmpleado: number;
  nombreEmpleado: string;
  apellidoEmpleado: string;
  dniEmpleado: string;
  cargoEmpleado: string;
  usernameEmpleado: string;
  contrasenaEmpleado: string;
  isEdit: boolean;
  isView: boolean;
  contrasena: string
  roles: Rol[];
  constructor(private activatedRoute: ActivatedRoute, private empleadoService: EmpleadosService, private location: Location,
    private router: Router, private navCtrl: NavController) { }

  ngOnInit() {
    this.isEdit = window.location.pathname.toLowerCase().endsWith('edit');
    this.isView = window.location.pathname.toLowerCase().endsWith('view');
    this.cargarProducto();
  }

  cargarProducto(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.empleadoService.findEmpleadoById(id).subscribe(res => {
          this.idEmpleado = res.idEmpleados,
          this.nombreEmpleado = res.nombreEmpleados,
          this.apellidoEmpleado = res.apellidosEmpleados,
          this.dniEmpleado = res.dniEmpleados,
          this.cargoEmpleado =res.cargoEmpleados == 1 ? 'ROLE_ENCARGADO' : 'ROLE_DEPENDIENTE',
          this.usernameEmpleado = res.usernameEmpleados,
          this.contrasena = res.contrasenaEmpleados
        })
      }
    })
} 
  private createFromForm(): Empleado {
    this.roles = [{
      ...new Rol(),
      idRol:  this.cargoEmpleado == 'ROLE_ENCARGADO' ? 1 : 2,
      nombreRol:   this.cargoEmpleado
    }]
    const entity = {
      ...new Empleado(),
      idEmpleados: this.idEmpleado,
      nombreEmpleados: this.nombreEmpleado,
      apellidosEmpleados: this.apellidoEmpleado,
      dniEmpleados: this.dniEmpleado,
      cargoEmpleados: this.cargoEmpleado == 'ROLE_ENCARGADO' ? 1 : 2,
      enabledEmpleados: 1,
      usernameEmpleados: this.usernameEmpleado,
      contrasenaEmpleados: this.contrasena ? this.contrasena : this.contrasenaEmpleado,
      roles: this.roles
    }
    return entity;
  }

  createEmpleado(){
    let empleado = this.createFromForm();
    if(!this.isEdit && !this.isView || !empleado.idEmpleados){
      this.empleadoService.createEmpleado(empleado).subscribe(res => {
        this.navCtrl.navigateBack('/tabs/empleados');
        swal.fire('Nuevo empleado', `Empleado ${empleado.idEmpleados} creado con éxito!`, 'success');
      });
    }else{
      this.updateEmpleado(empleado);
    }
  }

  updateEmpleado(empleado: any){
    this.empleadoService.updateEmpleado(empleado.idEmpleados, empleado).subscribe(res => {
      this.navCtrl.navigateRoot('/tabs/empleados');
      swal.fire('Empleado actualizado', `Producto ${empleado.idEmpleados} actualizado con éxito!`, 'success')
    });
  }

  cancelEmpleado() {
    this.navCtrl.navigateBack('/tabs/empleados');
  }
}
