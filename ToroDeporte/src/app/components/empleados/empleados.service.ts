import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../login/auth.service';
import { Empleado } from './empleados.model';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  private url: string = 'http://localhost:8080/api/empleados';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }
  
  private agregarSeguridadCabecera(){
    let token = this.authService.dataToken;
    if(token){
      return this.httpHeaders.append('Authorization', 'Bearer '+ token);
    }else return this.httpHeaders;
  }

  getEmpleadosAll(): Observable<any> {
    return this.http.get<Empleado[]>(`${this.url}`, {headers: this.agregarSeguridadCabecera()})
  }

  getEmpleados(page: number): Observable<any> {
    return this.http.get<Empleado[]>(`${this.url}/page/${page}`, {headers: this.agregarSeguridadCabecera()})
  }
}
