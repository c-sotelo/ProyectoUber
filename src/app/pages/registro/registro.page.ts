import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from '../../services/firebase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  registroForm: FormGroup;
  isSubmitted = false;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private alertController: AlertController,
    private formBuilder: FormBuilder
  ) {
    this.registroForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  get errorControl() {
    return this.registroForm.controls;
  }

  async registro() {
    this.isSubmitted = true;

    if (!this.registroForm.valid) {
      await this.mostrarAlerta('Error', 'Formulario inválido', 'Por favor complete todos los campos correctamente');
      return;
    }

    if (this.registroForm.value.password !== this.registroForm.value.confirmPassword) {
      await this.mostrarAlerta('Error', 'Contraseñas no coinciden', 'Las contraseñas ingresadas no son iguales');
      return;
    }

    try {
      await this.firebaseService.registro(
        this.registroForm.value.email,
        this.registroForm.value.password
      );
      this.router.navigate(['/inicio']);
    } catch (error: any) {
      let mensaje = 'No se pudo completar el registro';
      if (error.code === 'auth/email-already-in-use') {
        mensaje = 'El correo ya está registrado';
      }
      await this.mostrarAlerta('Error', 'Error de registro', mensaje);
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
