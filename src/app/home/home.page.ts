import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ionViewWillEnter() {
    const animatedImage = this.el.nativeElement.querySelector('.animated-image');
    if (animatedImage) {
      this.renderer.removeClass(animatedImage, 'animate'); // Quita la clase para reiniciar la animación
      setTimeout(() => {
        this.renderer.addClass(animatedImage, 'animate'); // Añade la clase nuevamente para activar la animación
      }, 50); // Delay corto para asegurar el reinicio
    }
  }

}