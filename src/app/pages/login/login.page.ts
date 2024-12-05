import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;
  isSubmitted = false;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private alertController: AlertController,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get errorControl() {
    return this.loginForm.controls;
  }

  async login() {
    this.isSubmitted = true;
    
    if (!this.loginForm.valid) {
      await this.mostrarAlerta(
        'Error', 
        'Formulario inválido', 
        'Por favor, complete todos los campos correctamente.'
      );
      return;
    }

    try {
      const result = await this.firebaseService.login(
        this.loginForm.value.email,
        this.loginForm.value.password
      );
      
      if (result) {
        this.router.navigate(['/inicio']);
      }
    } catch (error: any) {
      let mensaje = 'Credenciales inválidas';
      if (error.code === 'auth/user-not-found') {
        mensaje = 'Usuario no encontrado';
      } else if (error.code === 'auth/wrong-password') {
        mensaje = 'Contraseña incorrecta';
      }
      
      await this.mostrarAlerta(
        'Error',
        'Error de inicio de sesión',
        mensaje
      );
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
