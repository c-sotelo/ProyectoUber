import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

interface Vehiculo {
  marca: string;
  modelo: string;
}

@Component({
  selector: 'app-agregarvehiculo',
  templateUrl: './agregarvehiculo.page.html',
  styleUrls: ['./agregarvehiculo.page.scss'],
})
export class AgregarvehiculoPage {
  nuevoVehiculo: Vehiculo = {
    marca: '',
    modelo: ''
  };

  constructor(
    private router: Router,
    private alertController: AlertController
  ) { }

  async agregarVehiculo() {
    if (!this.nuevoVehiculo.marca || !this.nuevoVehiculo.modelo) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor complete todos los campos',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    let vehiculos: Vehiculo[] = [];
    const vehiculosGuardados = localStorage.getItem('vehiculos');
    
    if (vehiculosGuardados) {
      vehiculos = JSON.parse(vehiculosGuardados);
    }

    vehiculos.push({...this.nuevoVehiculo});
    localStorage.setItem('vehiculos', JSON.stringify(vehiculos));
    
    const alertExito = await this.alertController.create({
      header: 'Éxito',
      message: 'Vehículo agregado correctamente',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['/vehiculo']);
        }
      }]
    });
    await alertExito.present();
  }
}
