import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent} from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/login/auth.page';
import { Observable } from 'rxjs';
import { Producto } from '../../model/productos.model';

@Injectable({
    providedIn: 'root'
  })
  export class ProductosService {
    private url: string = 'http://localhost:8080/api/productos';
    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

    constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

    private agregarSeguridadCabecera(){
        let token = this.authService.dataToken;
        if(token){
          return this.httpHeaders.append('Authorization', 'Bearer '+ token);
        }else return this.httpHeaders;
      }
    
      private noAuthorized(error): boolean{
        if(error.status==401 || error.status==403){
          this.router.navigate(['/login']);
          return true;
        }
        return false;
      }

      getProductos(page: number): Observable<any> {
        return this.http.get<Producto[]>(`${this.url}/page/${page}`, {headers: this.agregarSeguridadCabecera()})
      }

      getProductosAll(): Observable<any> {
        return this.http.get<Producto[]>(`${this.url}`, {headers: this.agregarSeguridadCabecera()})
      }

      findProductoById(idProducto: number): Observable<Producto> {
        return this.http.get<Producto>(`${this.url}/${idProducto}`, {headers: this.agregarSeguridadCabecera()})
      }
      
      deleteProductos(idProducto: number): Observable<any> {
        return this.http.delete<any>(`${this.url}/delete/${idProducto}`, {headers: this.agregarSeguridadCabecera()})
      }

      createProductos(producto: Producto): Observable<Producto> {
        return this.http.post<Producto>(`${this.url}/create`, producto, {headers: this.agregarSeguridadCabecera()})
      }

      updateProducto(idProducto: number, producto: Producto): Observable<Producto>{
        return this.http.put<Producto>(`${this.url}/update/${idProducto}`, producto, {headers: this.agregarSeguridadCabecera()})
      }
}