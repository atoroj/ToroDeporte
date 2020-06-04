import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IEmpleado } from './empleado.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private empleado: IEmpleado;
  private token: string;

  constructor(private http: HttpClient) { }

  login(empleado: IEmpleado): Observable<any> {
    let url = 'http://localhost:8080/oauth/token';
    let credenciales = btoa('torodeporte' + ':' + 'sevilla');
    const httpHeaders = new HttpHeaders()
      .set('content-type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Basic ' + credenciales);

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', empleado.usernameEmpleado);
    params.set('password', empleado.contrasenaEmpleado);
    console.log(httpHeaders);
    return this.http.post<any>(url, params.toString(), { headers: httpHeaders })
  }

  logout(){
    this.token = null;
    this.empleado = null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('empleado');
  }
  guardarEmpleado(token: string) {
    let payload = this.getDataToken(token);
    this.empleado = new IEmpleado();
    this.empleado.nombreEmpleado = payload.user_name;
    this.empleado.roles = payload.authorities;
    //GUARDA EN SESION LOS ROLES Y EL NOMBRE DE USUARIO
    sessionStorage.setItem('empleado', JSON.stringify(this.empleado));
    //JSON.parse(sessionStorage.getItem('empleado') para sacar los datos
  }

  guardarToken(token: string) {
    this.token = token
    sessionStorage.setItem('token', token);
  }
  getDataToken(token: string) {
    if (token) {
      return JSON.parse(atob(token.split(".")[1]));
    } else return null;
  }

  public get dataToken(): string {
    if (this.token) {
      return this.token;
    } else if (!this.token && sessionStorage.getItem('token')) {
      this.token = sessionStorage.getItem('token');
      return this.token;  
    } else {
      return null;
    }
  }
  
  public isAuthenticated(){
    let payload = this.getDataToken(this.dataToken); 
    if(payload && payload.user_name && payload.user_name.length>0){
      return true;
    } else return false;
  }
}
