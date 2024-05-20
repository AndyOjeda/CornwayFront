import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {StyleClassModule} from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [ RouterOutlet, StyleClassModule, ButtonModule, HttpClientModule, FormsModule, NgbAlertModule],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.css'
})
export class ErrorPageComponent {

  constructor(private router: Router) { }

  sesionPage() {
    this.router.navigate(['/IniciarSesion']);
  }

}
