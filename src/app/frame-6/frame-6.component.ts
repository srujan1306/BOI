import { Component, OnInit, HostListener } from '@angular/core';
import { ServiceOfferingsComponent } from '../service-offerings/service-offerings.component';

@Component({
  selector: 'app-frame-6',
  standalone: true,
  imports: [ServiceOfferingsComponent],
  templateUrl: './frame-6.component.html',
  styleUrl: './frame-6.component.scss',
})
export class Frame6Component implements OnInit {
  isMobile: boolean = false;

  ngOnInit(): void {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth < 480;
    if (this.isMobile) {
      // Your code for mobile screens here
      console.log('Screen size is less than 480px');
    }
  }
  isDropdown_gold: boolean = false;
  isDropdown_diamond: boolean = false;
  isDropdown_platinum: boolean = false;

  toggle_dropdown(serice_pack: string) {
    if (serice_pack == 'gold') {
      this.isDropdown_gold = !this.isDropdown_gold;
    } else if (serice_pack == 'diamond') {
      this.isDropdown_diamond = !this.isDropdown_diamond;
    } else {
      this.isDropdown_platinum = !this.isDropdown_platinum;
    }
  }
}
