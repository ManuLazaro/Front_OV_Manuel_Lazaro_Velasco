import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true, // Hace el componente independiente
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule] 
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {} // Inyección del servicio Router


  onSubmit() {
    console.log('Correo:', this.email);
    console.log('Contraseña:', this.password);
   
    this.router.navigate(['/home']);
  }
}
