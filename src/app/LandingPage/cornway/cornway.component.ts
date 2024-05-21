import { Component, OnInit, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router} from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';
import { CultivosComponent } from '../cultivos/cultivos.component';
import { CosechaComponent } from '../cosecha/cosecha.component';
import { TabViewModule } from 'primeng/tabview';
import { ConfiguracionComponent } from '../configuracion/configuracion.component';
import { ApiService } from '../../Services/api.service';
import { GestionComponent } from '../gestion/gestion.component';
import { InsumosComponent } from '../insumos/insumos.component';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-cornway',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ButtonModule, TabMenuModule, CultivosComponent,
    CosechaComponent, TabViewModule, ConfiguracionComponent, GestionComponent, InsumosComponent, NgbDatepickerModule, CommonModule],
  templateUrl: './cornway.component.html',
  styleUrl: './cornway.component.css'
})
export class CornwayComponent {

  users: any[] = [];
  nombres: string = '';
  Apellidos: string = '';
  objetosFiltrados: any[] = [];
  idFiltro: number = 0; // Suponiendo que el ID a comparar está en localStorage

  constructor(private ApiService: ApiService,
              private router: Router,
              private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getUsuario();
  }

  getUsuario(): void {
    const idUsuario = localStorage.getItem('IdUsuario');
    if (idUsuario) {
    this.ApiService.getUsuarios().subscribe((data: any) => {
      this.objetosFiltrados = data;
      console.log(data);
      this.users = data.filter((user: any) => user.idUsuario == idUsuario);
      console.log(this.users);
    });
  }
}

  onLogOut(): void {
    console.log('Saliendo de la aplicación');
    localStorage.removeItem('IdUsuario');
    this.router.navigate(['/']);
  }

}
