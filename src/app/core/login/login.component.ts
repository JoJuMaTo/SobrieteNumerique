import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthService, AuthRequest } from '../services/auth.service';
import {FormsModule} from "@angular/forms";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  credentials: AuthRequest = {username: '', password: ''};
  message: string = '';



  constructor(protected authService: AuthService, private router: Router, private route: ActivatedRoute) {
    console.log('Constructor: credentials', this.credentials);
  }



  ngOnInit() {

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    console.log('OnInit: credentials', this.credentials);
    this.route.queryParams.subscribe(params => {
      if (params['authRequired']) {
        console.log('TEST' + this.message);
        this.message = 'Vous devez vous authentifier d\'abord.';
      }
    });
  }




  login(): void {
    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.router.navigate(['juxbar/profile']);  // Assurez-vous que la route est correcte
      },
      error: error => {
        this.message = 'Échec de la connexion, vérifiez votre nom d’utilisateur/mot de passe';
        console.error('Login error', error);
      }
    });
  }

  logout(): void {

    this.authService.logout();

  }
}
