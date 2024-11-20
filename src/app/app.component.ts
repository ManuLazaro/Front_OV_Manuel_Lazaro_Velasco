import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// COMPONENTE RAIZ
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Front_OV_Manuel_Lazaro_Velasco';
}
