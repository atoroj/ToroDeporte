import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';
import { faSignOutAlt, faKey, faUser, faUsers, faBoxOpen, faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent{
  faSignOutAlt = faSignOutAlt;
  faKey = faKey;
  faUser = faUser;
  faUsers = faUsers;
  faBoxOpen = faBoxOpen;
  faHome = faHome;
  authenticated: boolean = true;
  constructor(public authService: AuthService, private router: Router) { }

  cerrarSesion(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  cambiarPassword(){
    this.router.navigate(['/password/change']);
  }
 title: string = 'Toro Deporte'
}
