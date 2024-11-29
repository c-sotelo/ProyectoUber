import { Component, OnInit } from '@angular/core';
import { ViajeService } from '../../services/viaje.service';
import { Viaje } from '../../interfaces/viaje.interface';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html'
})
export class ViajePage implements OnInit {
  viajes: Viaje[] = [];

  constructor(private viajeService: ViajeService) { }

  ngOnInit() {
    this.viajeService.obtenerViajes().subscribe(viajes => {
      this.viajes = viajes;
    });
  }

  ionViewWillEnter() {
    this.viajeService.obtenerViajes().subscribe(viajes => {
      this.viajes = viajes;
    });
  }
}
