import { Component,Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { isPlatformBrowser,CommonModule  } from '@angular/common';
import { EmployeeService, EmployeeDto, ClientEntryService, ClientEntryDto, ClientEntryHourDto, ClientEntryHourService } from '../services/home.service'; // Importa el servicio 



@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [MenuComponent,BaseChartDirective, CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{
  public isBrowser: boolean;

    hours: ClientEntryHourDto[] = [];
    employees: EmployeeDto[] = [];
  
    constructor(
      @Inject(PLATFORM_ID) private platformId: Object,
      private clientEntryHourService: ClientEntryHourService,
      private employeeService: EmployeeService,
    ) {
      this.isBrowser = isPlatformBrowser(this.platformId);
    }
  
    ngOnInit(): void {
      this.loadHour();
      this.loadEmployees();
    }
  
    loadHour(): void {
      this.clientEntryHourService.getClientsCountByHour().subscribe(
        (data) => {
      
          this.hours = data;
          this.updateChartData();
        },
        (error) => {
          console.error('Error al cargar la grafica', error);
        }
      );
    }
    loadEmployees(): void {
      this.employeeService.getEmployeesByRole().subscribe(
        (data) => {
          
          this.employees = data;
        },
        (error) => {
          console.error('Error al cargar los empleados', error);
        }
      );
    }

    updateChartData(): void {
      // Inicializamos un arreglo de ceros para el conteo por hora
      const hourCounts = new Array(24).fill(0);
  
      // Asignamos el conteo de usuarios a la hora correspondiente
      this.hours.forEach(hourData => {
        if (hourData.entryId >= 7 && hourData.entryId <= 23) {
          hourCounts[hourData.entryId - 7] = hourData.count;
        }
      });
  
      // Asignamos los valores al gráfico
      this.barChartData = {
        labels: this.barChartLabels,
        datasets: [
          {
            data: hourCounts,
            label: 'Número de usuarios por hora',
          },
        ],
      };
    }
  
    // Opciones del gráfico
    public barChartOptions: ChartOptions = {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Hora',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Número de Usuarios',
          },
          beginAtZero: true,
        },
      },
    };
  
    // Etiquetas del gráfico: Horas del día
    public barChartLabels: string[] = [
      '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
      '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00',
    ];
  
    // Definición del tipo de gráfico (barras)
    public barChartType: ChartType = 'bar';
  
    // Leyenda del gráfico
    public barChartLegend = true;
  
    // Datos del gráfico: Número de usuarios por hora
    public barChartData: ChartConfiguration['data'] = {
      labels: this.barChartLabels,
      datasets: [
        {
          data: new Array(17).fill(0),
          label: 'Número de usuarios por hora',
        },
      ],
    };
  }

