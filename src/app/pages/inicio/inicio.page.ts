import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';

import { ElementRef, ViewChildren, ViewChild } from '@angular/core';
import type { QueryList } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard } from '@ionic/angular';
import { VehiculoPage } from '../vehiculo/vehiculo.page';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit,ViewWillEnter, ViewDidEnter, ViewWillLeave, ViewDidLeave {

  correo:string = "";
  loaded:boolean = false;
  isVisible: boolean = false;
  buttonsVisible: boolean = false;
  usuario: { correo: string; nombre: string } = { correo: '', nombre: '' };
  
  @ViewChild(IonCard, { read: ElementRef }) card: ElementRef<HTMLIonCardElement> | undefined;
  private animation: Animation | undefined;

  constructor(private activateRoute:ActivatedRoute,
              private router:Router,
              private animationCtrl: AnimationController
  ) { }
  ionViewDidLeave(): void {
    console.log("view did leave");
    
  }
  ionViewWillLeave(): void {
    console.log("view will leave");
    
  }
  ionViewDidEnter(): void {
    console.log("view did enter");
  }





  ionViewWillEnter(): void {
   console.log("view will enter");
   
  }

  ngOnInit() {
    this.correo = this.activateRoute.snapshot.params["correo"];
    console.log("PARAMETRO URL  ----> ", this.correo);
    
    this.isVisible = false;
    this.buttonsVisible = false;
    
    setTimeout(() =>{
      this.loaded = true;
    },4000)
  }

  iniciarViaje() {
    this.isVisible = true;
    // Esperamos un momento para que el elemento esté en el DOM
    setTimeout(() => {
      if (this.card) {
        this.animation = this.animationCtrl
          .create()
          .addElement(this.card.nativeElement)
          .duration(1500)
          .iterations(1)
          .fromTo('transform', 'translateY(-100px)', 'translateY(0px)')
          .fromTo('opacity', '0', '1');
        
        this.animation.play().then(() => {
          setTimeout(() => {
            this.buttonsVisible = true;
          }, 200);
        });
      }
    }, 100);
  }

  play() {
    if (this.animation) {
      this.animation.play();
    }
  }

  pause() {
    if (this.animation) {
      this.animation.pause();
    }
  }

  stop() {
    if (this.animation) {
      this.animation.stop();
    }
  }



  logout(){
    this.router.navigateByUrl('/login');
  }


}
