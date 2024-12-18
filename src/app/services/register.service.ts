import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl = 'http://localhost:8080/client/saveClient'; 

  constructor(private http: HttpClient) {}

  register(clientData: any): Observable<any> {
    return this.http.post(this.apiUrl, clientData); 
  }
}
