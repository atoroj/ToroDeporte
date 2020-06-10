import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from './empleados.service';
import { Empleado } from 'src/app/model/empleados.model';
import { AlertController } from '@ionic/angular';
import swal from 'sweetalert2';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  empleadosPaginated: Empleado;
  roles: string[];
  constructor(private empleadoService: EmpleadosService, private alertCtrl: AlertController) {}
  ngOnInit() {}

  ionViewWillEnter(){
    this.loadAll();
  }
  loadAll(){
    this.empleadoService.getEmpleadosAll().subscribe(res => {
      this.empleadosPaginated = res;
    })
    let empleado = JSON.parse(sessionStorage.getItem('empleado'));
    this.roles = empleado.roles;
  }
  hasRole(rol: string) {
    if(this.roles){
      if (this.roles.includes(rol)) {
        return true;
      } return false;
    }else return false;
  }
  async eliminarProducto(idEmpleado: number) {
    const alert = this.alertCtrl.create({
      header: '¿Seguro que desea eliminar?',
      message: `El producto con id ${idEmpleado} se eliminará`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: data => {
            this.empleadoService.deleteEmpleado(idEmpleado).subscribe(res => {
              this.loadAll();
              swal.fire('Empleado eliminado', `Empleado ${idEmpleado} eliminado con éxito!`, 'success');
            }, error => {
              if (error.status === 403) {
                swal.fire('Error:', `Usted no tiene permisos para eliminar.`, 'error');
              }
            })
          }
        }
      ]
    });
    (await alert).present();
  }
}
