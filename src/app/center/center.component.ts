import { MenuComponent } from "../menu/menu.component";
import { Component,Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { isPlatformBrowser,CommonModule  } from '@angular/common';
import { EmployeeService, EmployeeDto, ClientService, ClientDto } from '../services/home.service';
import { format } from 'date-fns';
import { AuthService } from "../services/auth.service";
import { FormsModule } from '@angular/forms'; 
import { Router, RouterModule } from '@angular/router';
import { RegisterService } from '../services/register.service';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-center',
  standalone: true,
  imports: [MenuComponent,BaseChartDirective, CommonModule, FormsModule, MatIconModule, RouterModule],
  templateUrl: './center.component.html',
  styleUrl: './center.component.css'
})
export class CenterComponent {
    formVisible: boolean = false;
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    password: string = '';
    confirmPassword: string = '';
    phone: string = '';
    birthDate: string = '';
    subscription: string = '';
    submitted: boolean = false;
    validEmail: boolean = true;
    passwordsMatch: boolean = true;
    registrationError: string = '';
    registrationSuccess: string = '';
    public isBrowser: boolean;
 
    // Lista de empleados y clientes para las tablas
    employees: EmployeeDto[] = [];
    clients: ClientDto[] = [];
  
    constructor(
      @Inject(PLATFORM_ID) private platformId: Object,
      private employeeService: EmployeeService,
      private clientService: ClientService,
      private authService: AuthService, 
      private registerService: RegisterService, 
      private router: Router   
    ) {
      this.isBrowser = isPlatformBrowser(this.platformId);
    }
  
    ngOnInit(): void {
      this.loadEmployees(); 
      this.loadClients();// Carga los empleados y los clientes al inicializar el componente
    }
  
    loadEmployees(): void {
      this.employeeService.getEmployeesByRole().subscribe(
        (data) => {
          this.employees = data; // Asigna los datos obtenidos
        },
        (error) => {
          console.error('Error al cargar los empleados', error);
        }
      );
    }
    loadClients(): void {
      this.clientService.getAllClients().subscribe(
        (data) => {
          // Mapea los datos y convierte creationDate a solo la fecha usando date-fns
          this.clients = data.map(client => {
            client.creationDate = format(new Date(client.creationDate), 'yyyy-MM-dd'); // Formato personalizado
            return client;
          });
        },
        (error) => {
          console.error('Error al cargar los clientes', error);
        }
      );
    }

    toggleForm(): void {
      this.formVisible = !this.formVisible;
    }
  
    cancelForm(): void {
      this.formVisible = false;
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.password = '';
      this.confirmPassword = '';
      this.phone = '';
      this.birthDate = '';
      this.subscription = '';
    }
    onSubmit() {
      this.submitted = true;
      this.validEmail = this.validateEmail(this.email);
      this.passwordsMatch = this.password === this.confirmPassword;
  
      if (
        !this.firstName ||
        !this.lastName ||
        !this.email ||
        !this.password ||
        !this.confirmPassword ||
        !this.phone ||
        !this.birthDate ||
        !this.subscription ||
        !this.validEmail ||
        !this.passwordsMatch
      ) {
        return;
      }
  
      const clientData = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        phone: this.phone,
        birthDate: this.birthDate,
        subscription: this.subscription
      };
  
      this.registerService.register(clientData).subscribe(
        (response) => {
          this.registrationSuccess = 'Cliente registrado exitosamente';
          this.registrationError = '';
          this.cancelForm();
        },
        (error) => {
          this.registrationError = 'Error al registrar cliente. Intente nuevamente';
          this.registrationSuccess = '';
        }
      );
    }
  
    validateEmail(email: string): boolean {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return regex.test(email);
    }
  }
