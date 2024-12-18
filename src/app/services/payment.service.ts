import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

export interface PaymentDto {
  clientDto: ClientDto;
  paymentDate: string;
  amount: number| null;
  method: string;
  status: string;
  email: string | null;
}

export interface ClientDto {
  firstName: string;
  lastName: string;
  subscription: string;
  status: string;
}

// Servicio de Pagos
@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'http://localhost:8080/payment'; // URL base para pagos

  constructor(private http: HttpClient) {}

  // Obtiene todos los pagos
  getAllPayments(): Observable<PaymentDto[]> {
    return this.http.get<PaymentDto[]>(`${this.apiUrl}/getAllPayments`); // get para todos los pagos
  }

  // Guarda un nuevo pago
  savePayment(paymentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/savePayment`, paymentData).pipe(
      catchError(error => {
        console.error('Error al hacer el POST:', error);
        return throwError(error);
      })
    );
  }
  
}
