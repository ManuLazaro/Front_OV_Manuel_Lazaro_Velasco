import { MenuComponent } from "../menu/menu.component";
import { Component,Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { isPlatformBrowser,CommonModule  } from '@angular/common';
import { EmployeeService, EmployeeDto, ClientService, ClientDto } from '../services/home.service';
import { format } from 'date-fns';


@Component({
  selector: 'app-center',
  standalone: true,
  imports: [MenuComponent,BaseChartDirective, CommonModule],
  templateUrl: './center.component.html',
  styleUrl: './center.component.css'
})
export class CenterComponent {
  public isBrowser: boolean;
  
    // Lista de empleados y clientes para las tablas
    employees: EmployeeDto[] = [];
    clients: ClientDto[] = [];
  
    constructor(
      @Inject(PLATFORM_ID) private platformId: Object,
      private employeeService: EmployeeService,
      private clientService: ClientService        // Se Inyecta el servicio
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
}
