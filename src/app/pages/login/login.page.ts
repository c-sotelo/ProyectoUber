import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async login() {
    try {
      const success = await this.authService.login(this.email, this.password);
      if (success) {
        this.router.navigate(['/inicio']);
      }
    } catch (error) {
      this.mostrarAlerta('Error', 'Error de inicio de sesión', 'Credenciales inválidas');
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

  registro() {
    this.router.navigate(['/registro']);
  }

  recuperarcontra() {
    this.router.navigate(['/recuperarcontra']);
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
