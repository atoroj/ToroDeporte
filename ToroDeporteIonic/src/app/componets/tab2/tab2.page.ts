import { Component, OnInit } from '@angular/core';
import { Producto } from '../../model/productos.model';
import { ProductosService } from './productos.service';
import swal from 'sweetalert2';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  page: number = 1;
  totalItems: number;
  productosPaginated: Producto;
  roles: string[];
  constructor(private productoService: ProductosService, private alertCtrl: AlertController) { }

  ngOnInit() {}
  ionViewWillEnter(){
    this.loadAll();
    
  }
  loadAll() {
    this.productoService.getProductosAll().subscribe(res => {
      this.productosPaginated = res;
    });
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
  async eliminarProducto(idProducto: number) {
    const alert = this.alertCtrl.create({
      header: '¿Seguro que desea eliminar?',
      message: `El producto con id ${idProducto} se eliminará`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: data => {
            this.productoService.deleteProductos(idProducto).subscribe(res => {
              this.loadAll();
              swal.fire('Producto eliminado', `Producto ${idProducto} eliminado con éxito!`, 'success');
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
