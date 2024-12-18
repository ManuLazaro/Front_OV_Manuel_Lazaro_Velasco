import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';  
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, MatIconModule, CommonModule, RouterModule],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = ''; 
  submitted: boolean = false; 

  constructor(
    private router: Router,
    private loginService: LoginService,
    private authService: AuthService
  ) {}

  onSubmit() {
    this.submitted = true; // Marcamos que el formulario fue enviado
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, complete todos los campos'; // Mensaje de error para campos vacíos
      return;
    }
  
    this.loginService.login(this.email, this.password).subscribe(
      (response) => {
        // Procesamos la respuesta del backend
        if (response.message === 'Login exitoso') {
          this.authService.setUserEmail(this.email);
          if (response.type === 'employee') {
            this.router.navigate(['/home']);
          } else if (response.type === 'client') {
            this.router.navigate(['/client-home']);
          }
        } else {
          // Si el backend devuelve un mensaje diferente a 'Login exitoso'
          this.errorMessage = response.message;
        }
      },
      (error) => {
        // Si ocurre un error en la comunicación con el backend
        this.errorMessage = 'Contraseña o Correo inconrrectos';
        console.error('Error en el login:', error); // Log para debugging
      }
    );
  }
  login(): void {
    this.authService.setUserEmail(this.email);
  }
}
