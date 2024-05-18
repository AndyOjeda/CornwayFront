import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router} from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from '../Services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-sesion-page',
  standalone: true,
  imports: [ButtonModule, RouterOutlet, RouterLink, HttpClientModule, FormsModule],
  templateUrl: './sesion-page.component.html',
  styleUrl: './sesion-page.component.css'
})
export class SesionPageComponent {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        console.log('Login successful', response);
        this.router.navigate(['/dashboard']); // Redirigir al usuario a otra página después de iniciar sesión
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }

}
