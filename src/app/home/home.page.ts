import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ionViewWillEnter() {
    const animatedText = this.el.nativeElement.querySelector('.animated-text');
    const animatedImage = this.el.nativeElement.querySelector('.animated-image');
    const animatedButtons = this.el.nativeElement.querySelector('.button-container');

    if (animatedText) {
      this.resetAnimation(animatedText, 'animate-text');
    }

    if (animatedImage) {
      this.resetAnimation(animatedImage, 'animate-image');
    }

    if (animatedButtons) {
      this.resetAnimation(animatedButtons, 'animate-buttons');
    }
  }

  private resetAnimation(element: HTMLElement, animationClass: string) {
    this.renderer.removeClass(element, animationClass);
    setTimeout(() => {
      this.renderer.addClass(element, animationClass);
    }, 50);
  }
}
