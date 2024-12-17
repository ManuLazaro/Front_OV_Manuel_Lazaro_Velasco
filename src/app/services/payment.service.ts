import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface PaymentDto {
  clientDto: ClientDto;
  paymentDate: string;
  amount: number;
  method: string;
  status: string;
}
export interface ClientDto {
    firstName: string;  
    lastName: string; 
    subscription: string;
    status: string;
  }

//Servicio de Empleados
@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'http://localhost:8080/payment/getAllPayments'; // URL del endpoint

  constructor(private http: HttpClient) {}

  getAllPayments(): Observable<PaymentDto[]> {
    return this.http.get<PaymentDto[]>(this.apiUrl); // Realiza la llamada GET
  }
}

