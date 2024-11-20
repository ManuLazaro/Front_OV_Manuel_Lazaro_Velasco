import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; // Importar HttpClient y HttpParams
import { Observable } from 'rxjs';


// Definir interfaces para los datos que vas a recibir
interface CenterInfo {
  id: number;
  name: string;
  address: string;
}

interface Client {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root' // Esto asegura que el servicio esté disponible globalmente en toda la aplicación
})
export class CenterService {

  // URL base de la API (esto se puede configurar en el archivo environment.ts)
  private apiUrl = environment.apiUrl;

  // Inyectar HttpClient para hacer solicitudes HTTP
  constructor(private http: HttpClient) { }

  // Obtener información de un centro por id
  getCenterInfoById(id: number): Observable<CenterInfo> {
    // Crear parámetros de la solicitud
    const params = new HttpParams().set('id', id.toString());

    // Hacer la solicitud GET a la API y devolver un observable
    return this.http.get<CenterInfo>(`${this.apiUrl}/centers/centersInfo`, { params });
  }

  // Obtener lista de clientes por id de centro
  getClientsByCenterId(id: number): Observable<Client[]> {
    // Crear parámetros de la solicitud
    const params = new HttpParams().set('id', id.toString());

    // Hacer la solicitud GET a la API y devolver un observable
    return this.http.get<Client[]>(`${this.apiUrl}/centers/clientsCenter`, { params });
  }
}
