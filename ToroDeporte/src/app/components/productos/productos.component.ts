import { Component, OnInit, HostListener } from '@angular/core';
import { ProductosService } from './productos.service';
import { Producto } from './productos.model';
import { faPencilAlt, faTrashAlt, faPlus, faFilePdf, faSearch, faEraser, faChartBar, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2';
import jsPDF from 'jspdf'
import 'jspdf-autotable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Chart } from 'chart.js';
import { URL_BACKEND } from '../../config/config';
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
  urlHeroku: string = URL_BACKEND;
  constructor(private productoService: ProductosService, private modalService: NgbModal) { }
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
    // this.rellenarGrafica();
    let empleado = JSON.parse(sessionStorage.getItem('empleado'));
    this.roles = empleado.roles;
  }

  loadAll() {
    this.productoService.getProductos(this.page - 1).subscribe(res => {
      this.totalItems = res.totalElements;
      this.productosPaginated = res.content;
    })
    this.productoService.getProductosAll().subscribe(res => {
      this.productosAll = res;
    })
  }
  hasRole(rol: string) {
    if (this.roles.includes(rol)) {
      return true;
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
  abrirGrafica(grafica) {
    this.modalService.open(grafica, { size: 'large', ariaLabelledBy: 'modal-basic-title' });
    this.rellenarGrafica();
  }
  rellenarGrafica() {
    let labelsGrafica = [];
    let porcentajeGrafica = [];
    let costeGrafica = [];
    let precioGrafica = [];
    let porcentajeBeneficio: number = 0;
    this.productosPaginated.forEach(producto => {
      porcentajeBeneficio = (producto.precioProducto * 100) / producto.costeProducto;
      labelsGrafica.push(producto.nombreProducto);
      costeGrafica.push(producto.costeProducto);
      precioGrafica.push(producto.precioProducto);
      porcentajeGrafica.push(porcentajeBeneficio.toFixed(2));
    })
    const canvas: any = <HTMLElement>document.getElementById('graficaProducto');
    const ctx = canvas.getContext('2d');
    this.graficaData = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labelsGrafica,
        datasets: [{
          label: 'Coste producto',
          data: costeGrafica,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(206, 147, 216, 0.2)',
            'rgba(121, 134, 203, 0.2)',
            'rgba(77, 208, 225, 0.2)',
            'rgba(220, 231, 117, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(206, 147, 216, 1)',
            'rgba(121, 134, 203, 1)',
            'rgba(77, 208, 225, 1)',
            'rgba(220, 231, 117, 1)'
          ],
          borderWidth: 1
        },
        {
          label: 'Precio producto',
          data: precioGrafica,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(206, 147, 216, 0.2)',
            'rgba(121, 134, 203, 0.2)',
            'rgba(77, 208, 225, 0.2)',
            'rgba(220, 231, 117, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(206, 147, 216, 1)',
            'rgba(121, 134, 203, 1)',
            'rgba(77, 208, 225, 1)',
            'rgba(220, 231, 117, 1)'
          ],
          borderWidth: 1
        },
        {
          type: 'line',
          label: 'Porcentaje Beneficio %',
          borderColor: 'rgba(1, 87, 155, 1)',
          borderWidth: 2,
          fill: false,
          data: porcentajeGrafica
        }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
