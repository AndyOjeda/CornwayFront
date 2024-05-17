import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router} from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ButtonModule, RouterOutlet, RouterLink, DropdownModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

    constructor(private router: Router,) { }

    goCornway() {
      this.router.navigate(['/Cornway']);
    }

}
