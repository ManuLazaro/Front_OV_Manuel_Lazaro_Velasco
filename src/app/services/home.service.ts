import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EmployeeDto {
  name: string;
  lastName:string;
  phone: string;
  turno: string;
  className: string;
  role: string;
  status: string;
}

export interface ClientDto {
  name: string;
  lastName:string;
  subscription: string;
  status: string;
  creationDate: string;
  
}
export interface ClientEntryDto {
  client: Client;
  entryTime: Date;
  exitTime: Date;
}
export interface Client {
  firstName: string;
  lastName:string;
  subscription: string;
  status: string;
  creationDate: string;
}

export interface ClientEntryHourDto {
  entryId: number;
  count: number;
}

//Servicio de Empleados
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8080/employee/getAllEmployee'; // URL del endpoint

  constructor(private http: HttpClient) {}

  getEmployeesByRole(): Observable<EmployeeDto[]> {
    return this.http.get<EmployeeDto[]>(this.apiUrl); // Realiza la llamada GET
  }
}


// Servicio de Clientes
@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = 'http://localhost:8080/client/getAllClients'; 

  constructor(private http: HttpClient) {}

  getAllClients(): Observable<ClientDto[]> {
    return this.http.get<ClientDto[]>(this.apiUrl); 
  }
}
@Injectable({
  providedIn: 'root',
})
export class ClientEntryService {
  private apiUrl = 'http://localhost:8080/client/getClientsByDate'; // URL de tu endpoint

  constructor(private http: HttpClient) {}

  getClientsByDate(dateTime: string): Observable<ClientEntryDto[]> {
    return this.http.get<ClientEntryDto[]>(`${this.apiUrl}?dateTime=${dateTime}`);
  }
}

@Injectable({
  providedIn: 'root',
})
export class ClientEntryHourService {
  private apiUrl = 'http://localhost:8080/client/getClientsCountByHour'; // URL de tu endpoint

  constructor(private http: HttpClient) {}

  getClientsCountByHour(): Observable<ClientEntryHourDto[]> {
    return this.http.get<ClientEntryHourDto[]>(this.apiUrl);
    
  }
}
