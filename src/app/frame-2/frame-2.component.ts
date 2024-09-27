import { Component } from '@angular/core';
@Component({
  selector: 'app-frame-2',
  standalone: true,
  imports: [],
  templateUrl: './frame-2.component.html',
  styleUrl: './frame-2.component.scss',
})
export class Frame2Component {
  images = ['images/0.jpg', 'images/1.png', 'images/2.png', 'images/3.png'];
  currentImage: string = 'images/0.jpg';

  onMouseEnter(index: number) {
    this.currentImage = this.images[index];
  }
}
