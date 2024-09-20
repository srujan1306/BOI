import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
export interface newCustomer {
  fullname: string;
  phone_number: number;
  state: string;
  email: number;
  company: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'BOI';
}
