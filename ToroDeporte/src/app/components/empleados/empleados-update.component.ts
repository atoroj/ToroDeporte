import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from './empleados.service';
import { FormBuilder } from '@angular/forms';
import { faSave, faBan } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import swal from 'sweetalert2';
import { Empleado, Rol } from './empleados.model';

@Component({
    selector: 'empleados-form',
    templateUrl: './empleados-update.component.html',
    styleUrls: ['./empleados.component.scss']
  })
  export class EmpleadoUpdateComponent implements OnInit {
    isEdit: boolean;
    isView: boolean;
    faSave = faSave;
    faBan = faBan;
    roles: Rol[];
    contrasena: string;
    empleadoForm = this.fb.group({
      idEmpleados: [''],
      nombreEmpleados: [''],
      apellidosEmpleados: [''],
      dniEmpleados: [''],
      usernameEmpleados: [''],
      contrasenaEmpleados: [''],
      cargoEmpleados: ['']
    });
    constructor(private fb: FormBuilder, private empleadoService: EmpleadosService, private router: Router, private activatedRoute: ActivatedRoute, private location: Location){}
    
    ngOnInit() {
      this.isEdit = window.location.pathname.toLowerCase().endsWith('edit');
      this.isView = window.location.pathname.toLowerCase().endsWith('view');
      this.cargarEmpleado();
    }
    cargarEmpleado(): void{
      this.activatedRoute.params.subscribe(params => {
        let id = params['id']
        if(id){
          this.empleadoService.findEmpleadoById(id).subscribe(res => {
            this.empleadoForm.patchValue({
              idEmpleados: res.idEmpleados,
              nombreEmpleados: res.nombreEmpleados,
              apellidosEmpleados: res.apellidosEmpleados,
              dniEmpleados: res.dniEmpleados,
              usernameEmpleados: res.usernameEmpleados,
              cargoEmpleados: res.cargoEmpleados == 1 ? 'ROLE_ENCARGADO' : 'ROLE_DEPENDIENTE'
            })
            this.contrasena = res.contrasenaEmpleados;
          })
        }
      })
}
    private createFromForm(): Empleado {
      this.roles = [{
        ...new Rol(),
        idRol:  this.empleadoForm.get(['cargoEmpleados']).value == 'ROLE_ENCARGADO' ? 1 : 2,
        nombreRol:  this.empleadoForm.get(['cargoEmpleados']).value
      }]
      const entity = {
        ...new Empleado(),
        idEmpleados: this.empleadoForm.get(['idEmpleados']).value,
        nombreEmpleados: this.empleadoForm.get(['nombreEmpleados']).value,
        apellidosEmpleados: this.empleadoForm.get(['apellidosEmpleados']).value,
        dniEmpleados: this.empleadoForm.get(['dniEmpleados']).value,
        usernameEmpleados: this.empleadoForm.get(['usernameEmpleados']).value,
        enabledEmpleados: 1,
        contrasenaEmpleados: this.contrasena ? this.contrasena : this.empleadoForm.get(['contrasenaEmpleados']).value,
        cargoEmpleados: this.empleadoForm.get(['cargoEmpleados']).value == 'ROLE_ENCARGADO' ? 1 : 2,
        roles: this.roles
      }
      return entity;
    }

    createEmpleado(){
      let empleado = this.createFromForm();
      if(!this.isEdit && !this.isView || !empleado.idEmpleados){
        this.empleadoService.createEmpleado(empleado).subscribe(res => {
          this.router.navigate(['/empleados'])
          swal('Nuevo producto', `Producto ${empleado.idEmpleados} creado con éxito!`, 'success')
        });
      }else{
        this.updateEmpleado(empleado);
      }
    }
    updateEmpleado(empleado: any){
      this.empleadoService.updateEmpleado(empleado.idEmpleados, empleado).subscribe(res => {
        this.router.navigate(['/empleados'])
        swal('Producto actualizado', `Producto ${empleado.idEmpleados} actualizado con éxito!`, 'success')
      });
    }
    cancelEmpleado() {
      this.location.back();
    }
}