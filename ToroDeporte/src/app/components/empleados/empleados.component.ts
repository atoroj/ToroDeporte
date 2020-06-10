import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from './empleados.service';
import { Empleado } from './empleados.model';
import { faPencilAlt, faTrashAlt, faPlus, faFilePdf, faSearch, faEraser } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss']
})
export class EmpleadosComponent implements OnInit {
  page: number = 1;
  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;
  faFilePdf = faFilePdf;
  faPlus = faPlus;
  faSearch = faSearch;
  faEraser = faEraser;
  totalItems: number;
  empleadosPaginated: Empleado[];
  empleadosList: Empleado[];
  roles: string[];
  filterNombre: string = '';
  constructor(private empleadoService: EmpleadosService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('filtroEmpleado')) {
      this.filterNombre = sessionStorage.getItem('filtroEmpleado');
    }
    this.loadAll();
    let empleado = JSON.parse(sessionStorage.getItem('empleado'));
    this.roles = empleado.roles;
  }
  loadAll(){
    this.empleadoService.getEmpleados(this.page -1).subscribe(res => {
      this.totalItems = res.totalElements;
      this.empleadosPaginated = res.content;
      this.empleadosList = res.content.map(empleado =>{
        return {
          idEmpleados: empleado.idEmpleados,
          nombreEmpleados: empleado.nombreEmpleados,
          apellidosEmpleados: empleado.apellidosEmpleados,
          dniEmpleados: empleado.dniEmpleados,
          cargoEmpleados: empleado.cargoEmpleados == 1 ? 'Encargado' : 'Dependiente'
        }
      });
    })
  }
  deleteEmpleado(idEmpleado: number){
    swal({
      title: '¿Está seguro?',
      text: "¿Seguro que desea eliminar el empleado?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true

    }).then((result) => {
      if (result.value) {
        this.empleadoService.deleteEmpleado(idEmpleado).subscribe(res => {
          this.loadAll();
          swal('Empleado eliminado', `Empleado ${idEmpleado} eliminado con éxito!`, 'success');
        }, error => {
          if (error.status === 403) {
            swal('Error:', `Usted no tiene permisos para eliminar.`, 'error');
          }
        })
      }
    })
  }
  guardarFiltro() {
    if (this.filterNombre !== '') {
      sessionStorage.setItem('filtroEmpleado', this.filterNombre);
      swal('Enhorabuena', `Filtro guardado con éxito!`, 'success');
    }
    else swal('Cuidado!', `Debe hacer una busqueda para guardar filtro.`, 'warning');
  }
  eliminarFiltro() {
    if (this.filterNombre !== '') {
      this.filterNombre = '';
      sessionStorage.removeItem('filtroEmpleado');
    }
    else swal('Cuidado!', `No hay ningún filtro seleccionado.`, 'warning');
  }
  hasRole(rol: string) {
    if (this.roles.includes(rol)) {
      return true;
    } return false;
  }
}
