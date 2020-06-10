import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import  { LoginService } from './login.service';
import { IEmpleado } from './empleado.model';
import swal from 'sweetalert2';
import { AuthService } from './auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: [''],
    password: [''],
    recuerdame: [false]
  });
  errorLogin: boolean = false;
  empleado: IEmpleado;
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
    ) {
    }

  ngOnInit() {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/home']);
    }else this.router.navigate(['/login']);
  }
  login(){
    this.empleado = {
      ...new IEmpleado(),
        // usernameEmpleado: 'atoro',
        // contrasenaEmpleado: 'admintorodeporte'
        usernameEmpleado: this.loginForm.value.username,
        contrasenaEmpleado: this.loginForm.value.password
      }
    if(this.loginForm.value.username == null || this.loginForm.value.password == null){
      swal('Error login', 'Usuario o contraseña incorrecto', 'error');
      return;
    }
    this.authService.login(this.empleado).subscribe(response => {
      //SE LE PUEDE AÑADIR EL USUARIO AL JWT DESDE SPRING
      let payload = JSON.parse(atob(response.access_token.split(".")[1]));
      this.authService.guardarEmpleado(response.access_token);
      this.authService.guardarToken(response.access_token);
      this.router.navigate(['/home']);
    }, error => {
      if(error.status == 400){
        this.errorLogin = true;
        setTimeout(() => {this.hideMessage()}, 3000)}
    });
  }
  hideMessage(){
    this.errorLogin = false;
  }
}