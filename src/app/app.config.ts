import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


//SERVICIOS DE LA APLICACION
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
      provideClientHydration(),
      importProvidersFrom(HttpClientModule, BrowserAnimationsModule),
       importProvidersFrom(RouterModule.forRoot(routes)),
       provideCharts(withDefaultRegisterables()),
       importProvidersFrom(
        CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
      ),
      provideHttpClient(
        withFetch() // Habilita el uso de fetch
      )
      ]
};
