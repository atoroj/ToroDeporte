import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/login/auth.page';
import { Observable } from 'rxjs';
import { Producto } from '../../model/productos.model';
import { Empleado } from 'src/app/model/empleados.model';
import { SERVER_API_LOCAL } from '../../../assets/constantes';

@Injectable({
    providedIn: 'root'
})
export class EmpleadosService {
    private url: string = SERVER_API_LOCAL+'/api/empleados';
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

    private agregarSeguridadCabecera() {
        let token = this.authService.dataToken;
        if (token) {
            return this.httpHeaders.append('Authorization', 'Bearer ' + token);
        } else return this.httpHeaders;
    }

    private noAuthorized(error): boolean {
        if (error.status == 401 || error.status == 403) {
            this.router.navigate(['/login']);
            return true;
        }
        return false;
    }

    getEmpleadosAll(): Observable<any> {
        return this.http.get<Empleado[]>(`${this.url}`, { headers: this.agregarSeguridadCabecera() })
    }

    findEmpleadoById(idEmpleado: number): Observable<Empleado> {
        return this.http.get<Empleado>(`${this.url}/${idEmpleado}`, { headers: this.agregarSeguridadCabecera() })
    }

    createEmpleado(empleado: Empleado): Observable<Empleado> {
        return this.http.post<Empleado>(`${this.url}/create`, empleado, { headers: this.agregarSeguridadCabecera() })
    }

    updateEmpleado(idEmpleado: number, empleado: Empleado): Observable<Empleado> {
        return this.http.put<Empleado>(`${this.url}/update/${idEmpleado}`, empleado, { headers: this.agregarSeguridadCabecera() })
    }
    deleteEmpleado(idEmpleado: number): Observable<any> {
        return this.http.delete<any>(`${this.url}/delete/${idEmpleado}`, { headers: this.agregarSeguridadCabecera() })
    }
}