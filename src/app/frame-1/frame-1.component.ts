import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { AnimationsService } from '../animations.service';
@Component({
  selector: 'app-frame-1',
  standalone: true,
  imports: [],
  templateUrl: './frame-1.component.html',
  styleUrl: './frame-1.component.scss',
})
export class Frame1Component implements AfterViewInit {
  constructor(
    private el: ElementRef,
    private animationService: AnimationsService
  ) {}

  ngAfterViewInit() {
    this.animationService.loadAnimation(
      this.el.nativeElement.querySelector('.animation_1'),
      'animation_1.json'
    );
  }
}
