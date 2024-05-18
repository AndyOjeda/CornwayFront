import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router} from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-sesion-page',
  standalone: true,
  imports: [ButtonModule, RouterOutlet, RouterLink, HttpClientModule, FormsModule],
  templateUrl: './sesion-page.component.html',
  styleUrl: './sesion-page.component.css'
})
export class SesionPageComponent {
  Correo: string = '';
  Clave: string = '';

  constructor(private ApiService: ApiService, private router: Router) {}

  onLogin() {
    this.ApiService.login(this.Correo, this.Clave).subscribe(
      response => {
        console.log('Login successful', response);
        this.router.navigate(['/Cornway']); // Redirigir al usuario a otra página después de iniciar sesión
      },
      error => {
        console.error('Login failed', error);
        // Muestra un mensaje de error al usuario
        alert('Login failed. Please check your credentials and try again.');
      }
    );
  }
  }


