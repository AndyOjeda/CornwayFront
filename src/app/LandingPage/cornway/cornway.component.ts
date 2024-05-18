import { Component, OnInit, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router} from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';
import { CultivosComponent } from '../cultivos/cultivos.component';
import { CosechaComponent } from '../cosecha/cosecha.component';
import { ConfiguracionComponent } from '../configuracion/configuracion.component';
import { TabViewModule } from 'primeng/tabview';
import { CerrarComponent } from '../cerrar/cerrar.component';


@Component({
  selector: 'app-cornway',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ButtonModule, TabMenuModule, CultivosComponent,
    CosechaComponent, ConfiguracionComponent, TabViewModule, CerrarComponent],
  templateUrl: './cornway.component.html',
  styleUrl: './cornway.component.css'
})
export class CornwayComponent {

  constructor(private router: Router,) { }










}
