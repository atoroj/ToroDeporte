import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../model/productos.model';
import { ProductosService } from '../productos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import swal from 'sweetalert2';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-productos-update',
  templateUrl: './productos-update.page.html',
  styleUrls: ['./productos-update.page.scss'],
})
export class ProductosUpdatePage implements OnInit {
  producto: Producto;
  idProducto: number;
  nombreProducto: string;
  categoriaProducto: string;
  precioProducto: number;
  costeProducto: number;
  stockProducto: number;
  isEdit: boolean;
  isView: boolean;
  constructor(private activatedRoute: ActivatedRoute, private productoService: ProductosService, private location: Location,
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
        this.productoService.findProductoById(id).subscribe(res => {
          this.idProducto = res.idProducto,
          this.nombreProducto = res.nombreProducto,
          this.categoriaProducto = res.categoriaProducto,
          this.precioProducto = res.precioProducto,
          this.costeProducto = res.costeProducto,
          this.stockProducto = res.stockProducto
        })
      }
    })
} 
  private createFromForm(): Producto {
    const entity = {
      ...new Producto(),
      idProducto: this.idProducto,
      nombreProducto: this.nombreProducto,
      categoriaProducto: this.categoriaProducto,
      precioProducto: this.precioProducto,
      costeProducto: this.costeProducto,
      stockProducto: this.stockProducto
    }
    return entity;
  }

  createProducto(){
    let producto = this.createFromForm();
    if(!this.isEdit && !this.isView || !producto.idProducto){
      this.productoService.createProductos(producto).subscribe(res => {
        this.navCtrl.navigateBack('/tabs/productos');
        swal.fire('Nuevo producto', `Producto ${producto.idProducto} creado con éxito!`, 'success')
      });
    }else{
      this.updateProducto(producto);
    }
  }
  disabledButton(){
    if( this.nombreProducto && this.categoriaProducto
    && this.precioProducto && this.costeProducto && this.stockProducto){
      return false;
    }else return true;
}
  updateProducto(producto: any){
    this.productoService.updateProducto(producto.idProducto, producto).subscribe(res => {
      this.navCtrl.navigateRoot('/tabs/productos');
      swal.fire('Producto actualizado', `Producto ${producto.idProducto} actualizado con éxito!`, 'success')
    });
  }

  cancelProducto() {
    this.navCtrl.navigateBack('/tabs/productos');
  }
}
