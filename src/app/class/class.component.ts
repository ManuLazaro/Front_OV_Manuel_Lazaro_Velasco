import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
@Component({
  selector: 'app-class',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './class.component.html',
  styleUrl: './class.component.css'
})
export class ClassComponent {
 
}