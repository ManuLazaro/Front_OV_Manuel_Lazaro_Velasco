import { Component,Inject, PLATFORM_ID } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenuComponent,BaseChartDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // Variable para determinar si estamos en el navegador o no
  public isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Verifica si estamos en el navegador
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // Opciones del gráfico
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Hora'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Número de Usuarios'
        },
        beginAtZero: true
      }
    }
  };

  // Etiquetas del gráfico: Horas del día
  public barChartLabels: string[] = [
    '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
    '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
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
        data: [10, 15, 30,40,50,70, 75, 50, 20, 40,60, 80, 90, 80, 60,10,10],
        label: 'Media de usuarios',
      }
    ]
  };
}