import { Component } from '@angular/core';

@Component({
  selector: 'app-frame-3',
  standalone: true,
  imports: [],
  templateUrl: './frame-3.component.html',
  styleUrl: './frame-3.component.scss',
})
export class Frame3Component {
  scrollToFrame4() {
    const frame4Element = document.getElementById('frame4');
    if (frame4Element) {
      frame4Element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
