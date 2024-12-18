import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component'; 
import { CenterComponent } from './center/center.component';
import { RouterModule } from '@angular/router'; 
import { EmployeeComponent } from './employee/employee.component';
import { ClassComponent } from './class/class.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderComponent } from './order/order.component';
import { InventoryComponent } from './inventory/inventory.component';
import { TableComponent } from './components/table/table.component';
import { RegisterComponent } from './register/register.component';
import { ClientHomeComponent } from './client-home/client-home.component';



//Rutas de la aplicacion
export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },  // LLEVA LA RUTA BASE
    { path: 'login', component: LoginComponent }, // A LA RUTA /login
    { path: 'menu', component: MenuComponent }, // Nueva ruta para el menú
    { path: 'home', component: HomeComponent }, // Nueva ruta para el home
    { path: 'center', component: CenterComponent }, // Ruta para el centro
    { path: 'employee', component: EmployeeComponent}, // Ruta para el employee
    { path: 'payment', component: PaymentComponent}, // Ruta para el employee
    { path: 'order', component: OrderComponent}, // Ruta para el employee
    { path: 'inventory', component: InventoryComponent}, // Ruta para el employee
    { path: 'class', component: ClassComponent}, // Ruta para la class
    { path: 'table', component: TableComponent},
    { path: 'register', component: RegisterComponent}, // ruta para el registro
    { path: 'client-home', component: ClientHomeComponent}, // ruta vista usuario
];
