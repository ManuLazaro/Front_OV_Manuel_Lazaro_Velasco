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

}
