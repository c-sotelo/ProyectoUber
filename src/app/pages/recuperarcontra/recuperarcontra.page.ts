import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperarcontra',
  templateUrl: './recuperarcontra.page.html',
  styleUrls: ['./recuperarcontra.page.scss'],
})
export class RecuperarcontraPage implements OnInit {
  email: string = '';

  constructor(
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async recuperarContrasena() {
    if (!this.validarEmail(this.email)) {
      await this.mostrarAlerta('Error', 'Correo inválido', 'Por favor ingrese un correo electrónico válido');
      return;
    }

    try {
      // Aquí iría la lógica para enviar el código de recuperación
      // Por ahora simularemos el proceso
      await this.mostrarAlerta(
        '¡Código enviado!', 
        'Por favor revise su correo',
        'Se ha enviado un código de recuperación a su correo electrónico. Revise también su carpeta de spam.'
      );
      this.router.navigate(['/login']);
    } catch (error) {
      await this.mostrarAlerta('Error', 'Error al enviar código', 'Hubo un problema al enviar el código. Por favor intente nuevamente.');
    }
  }

  private validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  private async mostrarAlerta(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
