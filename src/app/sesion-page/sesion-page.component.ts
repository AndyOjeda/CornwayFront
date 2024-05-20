import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router} from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-sesion-page',
  standalone: true,
  imports: [ ButtonModule, RouterOutlet, CardModule, DialogModule, InputTextModule, NgbDatepickerModule, DropdownModule, CommonModule, FormsModule],
  templateUrl: './sesion-page.component.html',
  styleUrl: './sesion-page.component.css'
})
export class SesionPageComponent implements OnInit {

  Correo: string = '';
  Clave: string = '';
  showAlert: boolean = false;
  users: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.apiService.getUsuarios().subscribe(
      (response: any) => {
        console.log('Users', response);
        this.users = response;
      },
      (error: any) => {
        console.error('Error getting users', error);
      }
    );
  }


  onLogin(): void {
    this.authService.login(this.Correo, this.Clave).subscribe(
      (response: any) => {
        console.log('Login successful', response);// Comparar con el código de estado HTTP
        const usuario = this.users.find((user) => user.correo === this.Correo);
        console.log(usuario);
        if (usuario) {
          usuario.IdUsuario;
          localStorage.setItem('IdUsuario', usuario.idUsuario);
          console.log(usuario.idUsuario);
          this.router.navigate(['/Cornway']);
        }



      },
      (error: any) => {
        console.error('Login failed', error);
        this.showAlert = true;
      }
    );
  }

  onLogOut(): void {
    localStorage.removeItem('IdUsuario');
  }
}
