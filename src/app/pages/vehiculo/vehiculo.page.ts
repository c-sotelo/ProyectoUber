import { Component, OnInit } from '@angular/core';

interface Vehiculo {
  marca: string;
  modelo: string;
}

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.page.html',
  styleUrls: ['./vehiculo.page.scss'],
})
export class VehiculoPage implements OnInit {
  vehiculos: Vehiculo[] = [];

  constructor() { }

  ngOnInit() {
    this.cargarVehiculos();
  }

  cargarVehiculos() {
    const vehiculosGuardados = localStorage.getItem('vehiculos');
    if (vehiculosGuardados) {
      this.vehiculos = JSON.parse(vehiculosGuardados);
    }
  }

  ionViewWillEnter() {
    this.cargarVehiculos();
  }
}
