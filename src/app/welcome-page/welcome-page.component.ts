import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router} from '@angular/router';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [ButtonModule, RouterOutlet],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css',
})

export class WelcomePageComponent {

  constructor(private router: Router,) { }

  goLoginPage() {
    this.router.navigate(['/IniciarSesion']);
  }

  goRegisterPage() {
    this.router.navigate(['/Registrarse']);
  }



}
