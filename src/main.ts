import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { RouterModule } from '@angular/router';

// INICIALIZA EL APPCOMPONET CON LA CONFIGURACION DE APPCONFIG
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
