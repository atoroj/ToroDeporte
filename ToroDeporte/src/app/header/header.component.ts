import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent{
  faSignOutAlt = faSignOutAlt;
  authenticated: boolean = true;
  constructor(public authService: AuthService, private router: Router) { }

  cerrarSesion(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

 title: string = 'Toro Deporte'
}
