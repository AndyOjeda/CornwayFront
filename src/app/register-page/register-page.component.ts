import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router} from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ButtonModule, RouterOutlet, RouterLink, DropdownModule, HttpClientModule, FormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  Nombres: string = '';
  Apellidos: string = '';
  Correo: string = '';
  Clave: string = '';
  IdTipoUsuario: number = 1;

  constructor(private ApiService: ApiService, private router: Router) {}

  register() {
    this.ApiService.register(this.Nombres, this.Apellidos, this.Correo, this.Clave, this.IdTipoUsuario).subscribe(
      response => {
        console.log('Login successful', response);
        this.router.navigate(['/IniciarSesion']); // Redirigir al usuario a otra página después de iniciar sesión
      },
      error => {
        console.error('Login failed', error);
        // Muestra un mensaje de error al usuario
        alert('Login failed. Please check your credentials and try again.');
      }
    );
  }

}
