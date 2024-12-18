import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { Router, RouterModule } from '@angular/router';
import { RegisterService } from '../services/register.service';
import { CommonModule } from '@angular/common';  
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule,MatIconModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  phone: string = '';
  birthDate: string = '';
  subscription: string = '';
  submitted: boolean = false;
  validEmail: boolean = true;
  passwordsMatch: boolean = true;
  registrationError: string = '';
  registrationSuccess: string = '';

  constructor(private router: Router, private registerService: RegisterService) {}

  onSubmit() {
    this.submitted = true;
    this.validEmail = this.validateEmail(this.email);
    this.passwordsMatch = this.password === this.confirmPassword;

    // Verificar si todos los campos están llenos y las contraseñas coinciden
    if (
      !this.firstName ||
      !this.lastName ||
      !this.email ||
      !this.password ||
      !this.confirmPassword ||
      !this.phone ||
      !this.birthDate ||
      !this.subscription ||
      !this.validEmail ||
      !this.passwordsMatch
    ) {
      return;
    }

    // Enviar los datos al backend
    const clientData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      phone: this.phone,
      birthDate: this.birthDate,
      subscription: this.subscription
    };

    this.registerService.register(clientData).subscribe(
      (response) => {
        this.registrationSuccess = 'Registro exitoso! Bienvenido.';
        this.registrationError = '';
        setTimeout(() => this.router.navigate(['/login']), 2000); // Redirigir después de 2 segundos
      },
      (error) => {
        this.registrationError = 'Hubo un problema al registrar tu cuenta. Intenta nuevamente.';
        this.registrationSuccess = '';
      }
    );
  }

  validateEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  }
}
