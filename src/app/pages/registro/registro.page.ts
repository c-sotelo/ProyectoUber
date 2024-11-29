import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async registro() {
    if (this.password !== this.confirmPassword) {
      this.mostrarAlerta('Error', 'Contraseñas no coinciden', 'Las contraseñas ingresadas no son iguales');
      return;
    }

    try {
      const success = await this.authService.register(this.email, this.password);
      if (success) {
        this.router.navigate(['/inicio']);
      }
    } catch (error) {
      this.mostrarAlerta('Error', 'Error de registro', 'No se pudo completar el registro');
    }
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
