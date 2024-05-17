import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { SesionPageComponent } from './sesion-page/sesion-page.component'
import { RegisterPageComponent } from './register-page/register-page.component'
import { CornwayComponent } from './LandingPage/cornway/cornway.component';
import { CosechaComponent } from './LandingPage/cosecha/cosecha.component';
import { CultivosComponent } from './LandingPage/cultivos/cultivos.component';
import { ConfiguracionComponent } from './LandingPage/configuracion/configuracion.component';


export const routes: Routes = [
  { path: '', component: WelcomePageComponent},
  { path: 'IniciarSesion', component: SesionPageComponent },
  { path: 'Registrarse', component: RegisterPageComponent},
  { path: 'Cornway', component: CornwayComponent },
  { path: 'Cosecha', component: CosechaComponent },
  { path: 'Cultivos', component: CultivosComponent },
  { path: 'Configuracion', component: ConfiguracionComponent }

];
