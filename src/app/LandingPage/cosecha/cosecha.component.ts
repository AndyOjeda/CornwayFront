import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router} from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cosecha',
  standalone: true,
  imports: [ButtonModule, RouterOutlet],
  templateUrl: './cosecha.component.html',
  styleUrl: './cosecha.component.css'
})
export class CosechaComponent {

}
