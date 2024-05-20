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


@Component({
  selector: 'app-cornway',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ButtonModule, TabMenuModule, CultivosComponent,
    CosechaComponent, TabViewModule, ConfiguracionComponent ],
  templateUrl: './cornway.component.html',
  styleUrl: './cornway.component.css'
})
export class CornwayComponent {

  objetosFiltrados: any[] = [];
  idFiltro: number = 0; // Suponiendo que el ID a comparar está en localStorage

  constructor(private ApiService: ApiService) { }

  ngOnInit(): void {
  ;
  }

  onLogOut(): void {
    localStorage.removeItem('IdUsuario');
  }

}
