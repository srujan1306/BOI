import { Component } from '@angular/core';
import { ServiceOfferingsComponent } from '../service-offerings/service-offerings.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Frame1Component } from '../frame-1/frame-1.component';
import { Frame2Component } from '../frame-2/frame-2.component';
import { Frame3Component } from '../frame-3/frame-3.component';
import { Frame4Component } from '../frame-4/frame-4.component';
import { Frame5Component } from '../frame-5/frame-5.component';
import { Frame6Component } from '../frame-6/frame-6.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    ServiceOfferingsComponent,
    RouterOutlet,
    RouterLink,
    Frame1Component,
    Frame2Component,
    Frame3Component,
    Frame4Component,
    Frame5Component,
    Frame6Component,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {}
