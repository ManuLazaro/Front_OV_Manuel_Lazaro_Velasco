import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
//Rutas de la aplicacion
export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },  // LLEVA LA RUTA BASE
    { path: 'login', component: LoginComponent }  // A LA RUTA /login
];
