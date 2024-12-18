import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userEmail: string | null = null;

  constructor(private http: HttpClient) {}

  // Método para establecer el correo del usuario
  setUserEmail(email: string): void {
    this.userEmail = email; // Guardar el correo en el servicio
  localStorage.setItem('userEmail', email); // Opcional: guardar el correo en el localStorage
  }

  // Método para obtener el correo del usuario
  getUserEmail(): string | null {
    if (this.userEmail) {
      return this.userEmail;  // Devuelve el correo si está guardado en el servicio
    }
    
    // Si el correo no está en el servicio, intenta obtenerlo del localStorage
    const storedEmail = localStorage.getItem('userEmail');
    return storedEmail ? storedEmail : null;
  }
  
  // Función para decodificar el JWT y obtener los datos
  private decodeToken(token: string): any {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1])); // Decodificar el JWT
      return decoded;
    } catch (error) {
      return null;
    }
  }

  // Método para verificar si el usuario está autenticado (si el correo está guardado)
  isAuthenticated(): boolean {
    return this.userEmail !== null;
  }
}
