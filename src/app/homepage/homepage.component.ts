import { Component } from '@angular/core';
import { ServiceOfferingsComponent } from '../service-offerings/service-offerings.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [ServiceOfferingsComponent, RouterOutlet, RouterLink],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {}
