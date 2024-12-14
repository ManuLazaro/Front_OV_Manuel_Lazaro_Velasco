import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";

@Component({
  selector: 'app-class-user',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './class-user.component.html',
  styleUrl: './class-user.component.css'
})
export class ClassUserComponent {

}
