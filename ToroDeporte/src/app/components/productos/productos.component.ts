import { Component, OnInit, HostListener } from '@angular/core';
import { ProductosService } from './productos.service';
import { Producto } from './productos.model';
import { faPencilAlt, faTrashAlt, faPlus, faFilePdf, faSearch, faEraser, faChartBar, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2';
import jsPDF from 'jspdf'
import 'jspdf-autotable';
import { error } from 'protractor';
import { AuthService } from '../../login/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  page: number = 1;
  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;
  faFilePdf = faFilePdf;
  faPlus = faPlus;
  faSearch = faSearch;
  faEraser = faEraser;
  faChartBar = faChartBar;
  faArrowLeft = faArrowLeft;
  productosPaginated: Producto[];
  productosAll: Producto[];
  totalItems: number;
  roles: string[];
  filterNombre: string = '';
  graficaData: Chart;
  constructor(private productoService: ProductosService, private authService: AuthService, private modalService: NgbModal) { }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode == 13) {
      this.guardarFiltro();
    }
  }
  ngOnInit(): void {
    if (sessionStorage.getItem('filtroProducto')) {
      this.filterNombre = sessionStorage.getItem('filtroProducto');
    }
    this.loadAll();
    this.rellenarGrafica();
    let empleado = JSON.parse(sessionStorage.getItem('empleado'));
    this.roles = empleado.roles;
  }

  loadAll() {
    this.productoService.getProductos(this.page - 1).subscribe(res => {
      this.totalItems = res.totalElements;
      this.productosPaginated = res.content;
    })
  }
  hasRole(rol: string) {
    if (this.roles) {
      let value = this.roles.indexOf(rol);
      return value > 0;
    } return false;
  }
  deleteProducto(idproducto: number) {
    swal({
      title: '¿Está seguro?',
      text: "¿Seguro que desea eliminar el producto?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true

    }).then((result) => {
      if (result.value) {
        this.productoService.deleteProductos(idproducto).subscribe(res => {
          this.loadAll();
          swal('Producto eliminado', `Producto ${idproducto} eliminado con éxito!`, 'success');
        }, error => {
          if (error.status === 403) {
            swal('Error:', `Usted no tiene permisos para eliminar.`, 'error');
          }
        })
      }
    })
  }

  loadPage(page: number) {
    if (page != this.page) {
      this.page = page;
      this.loadAll();
    }
  }
  guardarFiltro() {
    if (this.filterNombre !== '') {
      sessionStorage.setItem('filtroProducto', this.filterNombre);
      swal('Enhorabuena', `Filtro guardado con éxito!`, 'success');
    }
    else swal('Cuidado!', `Debe hacer una busqueda para guardar filtro.`, 'warning');
  }
  eliminarFiltro() {
    if (this.filterNombre !== '') {
      this.filterNombre = '';
      sessionStorage.removeItem('filtroProducto');
    }
    else swal('Cuidado!', `No hay ningún filtro seleccionado.`, 'warning');
  }
  descargarPdf() {
    var body = [];
    var head = [['Nombre', 'Categoria', 'Precio', 'Coste']]
    this.productoService.getProductosAll().subscribe(res => {
      this.productosAll = res;
      this.productosAll.forEach(producto => {
        let array = [producto.nombreProducto, producto.categoriaProducto, producto.precioProducto, producto.costeProducto]
        body.push(array);
      })
      var doc = new jsPDF()
      doc.text(7, 15, "Listado de productos");
      doc.autoTable({ head: head, body: body, startY: 20, margin: { horizontal: 7 } })
      doc.save('productos.pdf')
    });

  }
  abrirGrafica(grafica){
    
    this.modalService.open(grafica, {ariaLabelledBy: 'modal-basic-title'});
  }
  rellenarGrafica(){
    this.graficaData = new Chart("graficaProducto"), {
			labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
			datasets: [{
				type: 'line',
				label: 'Ganacia',
				borderColor: '#FF5733',
				borderWidth: 2,
				fill: false,
				data: []
			}, {
				type: 'bar',
				label: 'Precio',
				backgroundColor:'rgba(54, 162, 235, 0.2)',
				data: [],
				borderColor: 'white',
				borderWidth: 2
			}, {
				type: 'bar',
				label: 'Coste',
				backgroundColor: 'rgba(54, 162, 235, 0.2)',
				data: []
			}]

		};
  }
}
