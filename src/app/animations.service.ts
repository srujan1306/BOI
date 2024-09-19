import { Injectable } from '@angular/core';
import lottie from 'lottie-web';
@Injectable({
  providedIn: 'root',
})
export class AnimationsService {
  loadAnimation(container: HTMLElement, animationPath: string) {
    return lottie.loadAnimation({
      container,
      path: animationPath,
      renderer: 'svg',
      autoplay: true,
      loop: true,
    });
  }
}
