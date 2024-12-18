import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EntriesService {
  private apiUrl = 'http://localhost:8080/client/saveClientEntry'; 

  constructor(private http: HttpClient) {}

  saveClientEntry(email: string): Observable<any> {
    const body = { email };
    return this.http.post(this.apiUrl, body); 
  }
}
