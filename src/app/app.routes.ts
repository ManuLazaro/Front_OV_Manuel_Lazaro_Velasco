import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component'; 

//Rutas de la aplicacion
export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },  // LLEVA LA RUTA BASE
    { path: 'login', component: LoginComponent }, // A LA RUTA /login
    { path: 'menu', component: MenuComponent }, // Nueva ruta para el menú
    { path: 'home', component: HomeComponent }, // Nueva ruta para el home
];
