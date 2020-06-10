import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/model/empleados.model';
import swal from 'sweetalert2';
import { AuthService } from './auth.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usernameEmpleado: string;
  contrasenaEmpleado: string;
  empleado: Empleado;
  errorLogin: boolean;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {}

  login(){
    this.empleado = {
      ...new Empleado(),
        // usernameEmpleados: 'atoro',
        // contrasenaEmpleados: 'admintorodeporte'
        usernameEmpleados: this.usernameEmpleado,
        contrasenaEmpleados: this.contrasenaEmpleado
      }
    if(this.usernameEmpleado == null ||this.contrasenaEmpleado == null){
      swal.fire('Error login', 'Usuario o contraseña incorrecto', 'error');
      return;
    }
    this.authService.login(this.empleado).subscribe(response => {
      //SE LE PUEDE AÑADIR EL USUARIO AL JWT DESDE SPRING
      let payload = JSON.parse(atob(response.access_token.split(".")[1]));
      this.authService.guardarEmpleado(response.access_token);
      this.authService.guardarToken(response.access_token);
      this.router.navigate(['/tabs']);
    }, error => {
      if(error.status == 400){
        this.errorLogin = true;
        setTimeout(() => {this.hideMessage()}, 3000)
      }
    });
  }
  hideMessage(){
    this.errorLogin = false;
  }
}
