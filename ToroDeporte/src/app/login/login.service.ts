import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const url: string = 'http://localhost:9090/auth'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  constructor(private http: HttpClient) { }

  public login(username: string, password: string){
    let headers = new HttpHeaders({Authorization: 'Basic ' + btoa(username + ":" + password)})
    return this.http.get(`${url}/login`,{headers, responseType:'text' as 'json'})
  }
  public prueba(){
    return this.http.get("http://localhost:9090/auth/login");
  }
  public getUsuario(){
    let headers = new HttpHeaders({Authorization: 'Basic ' + btoa("ToroDeporte" + ":" + "sevilla")})
    return this.http.get(`${url}/getUsuarios`,{headers})
  }
}
