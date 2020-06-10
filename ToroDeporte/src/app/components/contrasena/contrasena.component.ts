import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faSave, faBan } from '@fortawesome/free-solid-svg-icons';
import { EmpleadosService } from '../empleados/empleados.service';
import { AuthService } from '../../login/auth.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-contrasena',
  templateUrl: './contrasena.component.html',
  styleUrls: ['./contrasena.component.scss']
})
export class ContrasenaComponent implements OnInit {
  faSave = faSave;
  faBan = faBan;
  contrasenaForm = this.fb.group({
    contrasenaNueva: [''],
    confirmarNueva: ['']
  })
  isError: boolean = false;
  constructor(private fb: FormBuilder, public empleadoService: EmpleadosService, private authService: AuthService,  private location: Location, private router: Router) { }

  ngOnInit(): void {
  }
  checkCoinciden(){
    if(this.contrasenaForm.value.contrasenaNueva == this.contrasenaForm.value.confirmarNueva){
      return true;
    }else return false;
  }
  saveContrasena(){
    let idEmpleado = this.authService.getIdEmpleado();
    if(this.checkCoinciden()){
      this.empleadoService.saveContrasena(idEmpleado, this.contrasenaForm.value.contrasenaNueva).subscribe(res => {
        swal('Producto actualizado', `Contraseña actualizada con éxito!`, 'success');
        this.authService.logout();
        this.router.navigate(['/login']);
      }), error => {
        if (error.status === 403) {
          swal('Error:', `Usted no tiene permisos para eliminar.`, 'error');
        }
      }
    } else{
      this.isError = true;
    }
  }

  leftContrasena(){
    this.location.back();
  }
}
