import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, MatIconModule, CommonModule],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = ''; 
  submitted: boolean = false; 

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}

  onSubmit() {
    this.submitted = true; // Marcamos que el formulario fue enviado
    if (!this.email || !this.password) {
      return; // Si los campos están vacíos, no enviamos la solicitud
    }

    this.loginService.login(this.email, this.password).subscribe(
      (response: string) => {

        if (response === 'Login exitoso') {
          this.router.navigate(['/home']);
        } else {

           this.errorMessage = response; // Mensaje de error si el login no es exitoso
        }
      },
      (error) => {
        alert('Error en el login: ' + error.message);
      }
    );
  }
  
}
