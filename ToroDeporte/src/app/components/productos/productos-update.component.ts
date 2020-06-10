import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductosService } from './productos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { faSave, faBan } from '@fortawesome/free-solid-svg-icons';
import { Producto } from './productos.model';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
    selector: 'productos-form',
    templateUrl: './productos-update.component.html',
    styleUrls: ['./productos.component.scss']
  })
  export class ProductoUpdateComponent implements OnInit {
    faSave = faSave;
    faBan = faBan;
    isEdit: boolean;
    isView: boolean;
    fotoSeleccionada: File;
    progreso: number = 0;
    productoForm = this.fb.group({
        idProducto: [''],
        nombreProducto: [''],
        categoriaProducto: [''],
        precioProducto: [],
        costeProducto: [],
        fotoProducto: [],
        stockProducto: []
      });
    productoCargado: Producto;
    constructor(private fb: FormBuilder, private productoService: ProductosService, private router: Router, private activatedRoute: ActivatedRoute, private location: Location){}
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
            this.productoForm.patchValue({
              idProducto: res.idProducto,
              nombreProducto: res.nombreProducto,
              categoriaProducto: res.categoriaProducto,
              precioProducto: res.precioProducto,
              costeProducto: res.costeProducto,
              fotoProducto: res.fotoProducto,
              stockProducto: res.stockProducto
            })
          })
        }
      })
}

    private createFromForm(): Producto {
      const entity = {
        ...new Producto(),
        idProducto: this.productoForm.get(['idProducto']).value,
        nombreProducto: this.productoForm.get(['nombreProducto']).value,
        categoriaProducto: this.productoForm.get(['categoriaProducto']).value,
        precioProducto: this.productoForm.get(['precioProducto']).value,
        costeProducto: this.productoForm.get(['costeProducto']).value,
        fotoProducto: this.productoForm.get(['fotoProducto']).value,
        stockProducto: this.productoForm.get(['stockProducto']).value
      }
      return entity;
    }

    disabledButton(){
        if( this.productoForm.value.nombreProducto && this.productoForm.value.categoriaProducto
        && this.productoForm.value.precioProducto && this.productoForm.value.costeProducto && this.productoForm.value.stockProducto){
          return false;
        }else return true;
    }

    createProducto(){
      let producto = this.createFromForm();
      if(!this.isEdit && !this.isView || !producto.idProducto){
        this.productoService.createProductos(producto).subscribe(res => {
          this.router.navigate(['/productos'])
          swal('Nuevo producto', `Producto ${producto.idProducto} creado con éxito!`, 'success')
        });
      }else{
        this.updateProducto(producto);
      }
    }

    updateProducto(producto: any){
      this.productoService.updateProducto(producto.idProducto, producto).subscribe(res => {
        this.router.navigate(['/productos'])
        swal('Producto actualizado', `Producto ${producto.idProducto} actualizado con éxito!`, 'success')
      });
    }
    cancelProducto() {
      this.location.back();
    }
    cambiarFoto(event){
      this.fotoSeleccionada = event.target.files[0];
        if(this.fotoSeleccionada.type.indexOf('image') < 0 ){
          swal('Error: debe seleccionar una imagen', '', 'error')
          this.fotoSeleccionada = null;
        }
    }
    subirFoto() {
      if(!this.fotoSeleccionada){
        swal('Error: debe seleccionar una imagen', '', 'error')
      }else{
        let producto = this.createFromForm();
        this.productoService.subirFotoProducto(this.fotoSeleccionada, producto.idProducto).subscribe( producto =>{
          if(producto.type === HttpEventType.UploadProgress){
            this.progreso = Math.round((100 * producto.loaded/producto.total));
          } else if(producto.type === HttpEventType.Response){
            let response: any = producto.body;
            this.productoCargado = response.producto as Producto;
            swal('Nueva foto de producto', `La foto se ha subido con éxito!`, 'success')
          }
        })
      }
    }
  }