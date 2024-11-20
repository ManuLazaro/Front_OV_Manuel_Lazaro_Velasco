import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

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

  onSubmit() {
    console.log('Correo:', this.email);
    console.log('Contraseña:', this.password);
    // Aquí puedes agregar lógica de autenticación.
  }
}
