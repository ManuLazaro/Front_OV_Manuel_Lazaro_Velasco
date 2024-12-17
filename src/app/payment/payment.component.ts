import { Component,Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PaymentService, PaymentDto } from '../services/payment.service'; 

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [MenuComponent,BaseChartDirective, CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent  implements OnInit {
 // Variable para determinar si estamos en el navegador o en SSR
 public isBrowser: boolean = false;

payments: PaymentDto[] = [];

constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private paymentService: PaymentService // Inyecta el servicio
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.loadPayments(); // Carga los empleados al inicializar el componente
    if (typeof window !== 'undefined') {
      this.isBrowser = true;
    }
  }
  loadPayments(): void {
    this.paymentService.getAllPayments().subscribe(
      (data) => {
        console.log('Datos recibidos:', data); 
        // Filtra los empleados con el rol "monitor" directamente aquí
        this.payments = data;
      },
      (error) => {
        console.error('Error al cargar los empleados', error);
      }
    );
  }

 // Datos para la gráfica de barras de usuarios por hora
 public barChartOptions = {
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

 public barChartLabels: string[] = [
   '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
   '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
 ];

 public barChartType: ChartType = 'bar';
 public barChartLegend = true;

 public barChartData = {
   labels: this.barChartLabels,
   datasets: [
     {
       data: [60, 6, 5, 2, 1, 0, 8, 5, 35, 50, 50, 30, 40, 10, 20, 10, 10,],
       label: 'Inscripciones',
       backgroundColor: '#42A5F5',
       borderColor: '#1E88E5',
       borderWidth: 1,
     }
   ]
 };

 // Datos para la gráfica de líneas del dinero embolsado
 public lineChartOptions: ChartOptions = {
   responsive: true,
   scales: {
     x: {
       title: {
         display: true,
         text: 'Meses del Año'
       }
     },
     y: {
       title: {
         display: true,
         text: 'Dinero Embolsado (en €)'
       },
       beginAtZero: true
     }
   }
 };

 public lineChartLabels: string[] = [
   'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre',
   'Octubre', 'Noviembre', 'Diciembre'
 ];

 public lineChartType: ChartType = 'line';
 public lineChartLegend = true;

 // Datos ficticios de dinero embolsado en € por cada mes
 public lineChartData = {
   labels: this.lineChartLabels,
   datasets: [
     {
       data: [13000, 8000, 8000, 6650, 6000, 9000, 11500, 11000, 9000, 7000, 6000, 5500],
       label: 'Ingresos',
       fill: false,
       borderColor: '#4CAF50', // Color de la línea
       tension: 0.1, // Suavizado de la línea
       pointBackgroundColor: '#4CAF50', // Color de los puntos
       borderWidth: 2
     }
   ]
 };

 }