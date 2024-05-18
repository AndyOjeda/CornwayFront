import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import {StyleClassModule} from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { SesionPageComponent } from './sesion-page/sesion-page.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WelcomePageComponent, StyleClassModule, ButtonModule, HttpClientModule, SesionPageComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Cornway';

}
