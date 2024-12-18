import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { isPlatformBrowser,CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService, EmployeeDto} from '../services/home.service'; // Importa el servicio 
import { AuthService } from '../services/auth.service';
import { PaymentDto, PaymentService } from '../services/payment.service';
import { EntriesService } from '../services/entreis.service';

@Component({
  selector: 'app-client-home',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, FormsModule],
  templateUrl: './client-home.component.html',
  styleUrl: './client-home.component.css'
})
export class ClientHomeComponent implements OnInit {
  public isBrowser: boolean;
  employees: EmployeeDto[] = [];
  formVisible: boolean = false;
  payment = {
    amount: null,
    method: '',
    status: 'completed'
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private employeeService: EmployeeService,
    private authService: AuthService,
    private paymentService: PaymentService,
    private entriesService: EntriesService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployeesByRole().subscribe(
      (data) => {
        this.employees = data.filter(employee => employee.role === 'monitor');
      },
      (error) => {
        console.error('Error al cargar los empleados', error);
      }
    );
  }

  toggleForm(): void {
    this.formVisible = !this.formVisible;
  }

  cancelForm(): void {
    this.formVisible = false;
    this.payment = { amount: null, method: '', status: 'completed' };
  }

  // Procesa el formulario y lo envía al backend
  submitForm(): void {
    const userEmail = this.authService.getUserEmail(); 
    console.log('Correo del usuario:', userEmail);  
    if (userEmail) {
      // Los datos que se enviarán al backend
      const paymentData = {
        email: userEmail, 
        amount: this.payment.amount,
        method: this.payment.method
      };
  
      // Llamada al servicio para guardar el pago
      this.paymentService.savePayment(paymentData).subscribe(
        (response) => {
          console.log('Pago registrado con éxito', response);
          this.cancelForm(); // Limpiar el formulario después de registrar el pago
        },
        (error) => {
          console.error('Error al registrar el pago', error);
        }
      );
    } else {
      console.error('Usuario no autenticado');
    }
  }
  animateQR(): void {
    const qrIcon = document.getElementById('qr-icon')!;
    
    // Agregar la clase de animación
    qrIcon.classList.add('animate');
    
    // Eliminar la clase de animación después de 2 segundos (para reiniciar la animación)
    setTimeout(() => {
      qrIcon.classList.remove('animate');
    }, 1800);
  // Obtener el email del usuario desde AuthService
  const userEmail = this.authService.getUserEmail(); 
  console.log('Correo del usuario:', userEmail); 

  if (userEmail) {
    // Llamamos al servicio para guardar la entrada del cliente
    this.entriesService.saveClientEntry(userEmail).subscribe(
      (response) => {
        console.log('Entrada del cliente registrada con éxito', response);
        // Aquí puedes hacer algo después de que se haya registrado correctamente, como mostrar un mensaje
      },
      (error) => {
        console.error('Error al registrar la entrada del cliente', error);
        // Aquí puedes manejar errores, por ejemplo, mostrando un mensaje de error al usuario
      }
    );
  } else {
    console.error('Usuario no autenticado');
  }
}

}
  