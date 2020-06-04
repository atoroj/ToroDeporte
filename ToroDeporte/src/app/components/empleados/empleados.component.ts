import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from './empleados.service';
import { Empleado } from './empleados.model';
import { faPencilAlt, faTrashAlt, faPlus, faFilePdf, faSearch, faEraser } from '@fortawesome/free-solid-svg-icons';

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
  empleadosPaginated: Empleado[]
  roles: string[];
  constructor(private empleadoService: EmpleadosService) { }

  ngOnInit(): void {
    this.loadAll();
    let empleado = JSON.parse(sessionStorage.getItem('empleado'));
    this.roles = empleado.roles;
  }
  loadAll(){
    this.empleadoService.getEmpleados(this.page -1).subscribe(res => {
      this.totalItems = res.totalElements;
      this.empleadosPaginated = res.content;
    })
  }
  hasRole(rol: string) {
    if (this.roles) {
      let value = this.roles.indexOf(rol);
      return value > 0;
    } return false;
  }
}
