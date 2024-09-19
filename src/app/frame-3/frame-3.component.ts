import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { AnimationsService } from '../animations.service';

@Component({
  selector: 'app-frame-3',
  standalone: true,
  imports: [],
  templateUrl: './frame-3.component.html',
  styleUrl: './frame-3.component.scss',
})
export class Frame3Component implements AfterViewInit {
  constructor(
    private el: ElementRef,
    private animationService: AnimationsService
  ) {}

  ngAfterViewInit() {
    const animations = [
      { className: 'animation_3', fileName: 'animation_3.json' },
      { className: 'animation_4', fileName: 'animation_4.json' },
      { className: 'animation_5', fileName: 'animation_5.json' },
      { className: 'animation_6', fileName: 'animation_6.json' },
      { className: 'animation_7', fileName: 'animation_7.json' },
    ];

    animations.forEach((animation) => {
      const element = this.el.nativeElement.querySelector(
        `.${animation.className}`
      );
      if (element) {
        this.animationService.loadAnimation(element, animation.fileName);
      }
    });
  }

  scrollToFrame4() {
    const frame4Element = document.getElementById('frame4');
    if (frame4Element) {
      frame4Element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
