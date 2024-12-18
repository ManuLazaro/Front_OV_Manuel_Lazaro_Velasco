import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';  
import Swal from 'sweetalert2';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ MatIconModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  // Método para abrir el enlace de About
  openAbout(event: Event): void {
    event.preventDefault(); // Evita que el navegador intente navegar
    window.open('https://github.com/ManuLazaro/OficinaVirtual', '_blank');
  }

  // Método para mostrar un mensaje de Contact con SweetAlert2
  showContactAlert(event: Event): void {
    event.preventDefault(); // Evita que el navegador intente navegar
    Swal.fire({
      title: 'Contacto',
      text: 'Para más información, escríbenos a info@oficinavirtual.com.',
      icon: 'info',
      confirmButtonText: 'Cerrar',
      confirmButtonColor: '#007BFF',
    });
  }
}