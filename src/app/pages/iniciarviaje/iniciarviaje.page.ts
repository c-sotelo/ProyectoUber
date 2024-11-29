import { Component, OnInit, OnDestroy } from '@angular/core';
import { ViajeService } from '../../services/viaje.service';
import { Router } from '@angular/router';
import { Network } from '@capacitor/network';
import { AlertController } from '@ionic/angular';

interface Vehiculo {
  marca: string;
  modelo: string;
}

@Component({
  selector: 'app-iniciarviaje',
  templateUrl: './iniciarviaje.page.html'
})
export class IniciarviajePage implements OnInit, OnDestroy {
  vehiculos: Vehiculo[] = [];
  nuevoViaje = {
    origen: '',
    destino: '',
    horaInicio: '',
    cantidadPasajeros: 0,
    idUsuario: 'KS-789',
    fecha: new Date().toLocaleDateString(),
    vehiculo: ''
  };

  constructor(
    private viajeService: ViajeService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.checkNetworkStatus();
  }

  ngOnInit() {
    this.cargarVehiculos();
  }

  cargarVehiculos() {
    const vehiculosGuardados = localStorage.getItem('vehiculos');
    if (vehiculosGuardados) {
      this.vehiculos = JSON.parse(vehiculosGuardados);
    }
  }

  iniciarViaje() {
    this.viajeService.agregarViaje(this.nuevoViaje);
    setTimeout(() => {
      this.router.navigate(['/viaje']);
    }, 1500);
  }

  async checkNetworkStatus() {
    const status = await Network.getStatus();
    
    Network.addListener('networkStatusChange', async (status) => {
      if (!status.connected) {
        const alert = await this.alertController.create({
          header: 'Sin conexión',
          message: 'No hay conexión a Internet',
          buttons: ['OK']
        });
        await alert.present();
      }
    });

    if (!status.connected) {
      const alert = await this.alertController.create({
        header: 'Sin conexión',
        message: 'No hay conexión a Internet',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  ngOnDestroy() {
    Network.removeAllListeners();
  }
}
