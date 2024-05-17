import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router} from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CornwayComponent } from '../LandingPage/cornway/cornway.component';

@Component({
  selector: 'app-sesion-page',
  standalone: true,
  imports: [ButtonModule, RouterOutlet, RouterLink],
  templateUrl: './sesion-page.component.html',
  styleUrl: './sesion-page.component.css'
})
export class SesionPageComponent {

    constructor(private router: Router,) { }

    goCornway() {
      this.router.navigate(['/Cornway']);
    }

}
