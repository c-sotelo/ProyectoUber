import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  
    correo:string = "";
    contrasena:string = "";
    contraconfirm:string = "";
  
    constructor(
      private router:Router,
      private firebase: FirebaseService,
      private helper: HelperService
    ) { }
  
    ngOnInit() {
    }
  
  
    async registro(){
    
      if (this.correo == "") {
        await this.helper.showAlert("Ingrese un correo", "Error");
        return;
      }
      if (this.contrasena == "") {
        await this.helper.showAlert("Ingrese una contraseña", "Error");
        return;
      }
      if (this.contraconfirm == "") {
        await this.helper.showAlert("Confirme la contraseña", "Error");
        return;
      }
      if (this.contraconfirm !== this.contrasena) {
        await this.helper.showAlert("Las contraseñas no coinciden", "Error");
        return;
      }

      const loader = await this.helper.showLoader("Registrando...");
      
      try {
        const response = await this.firebase.registro(this.correo, this.contrasena);
        await loader.dismiss();
        await this.helper.showAlert("Usuario registrado correctamente", "Éxito");
        this.router.navigateByUrl("/login");
      } catch (error: any) {
        await loader.dismiss();
        let mensaje = "Error al registrar";
        if (error.code === "auth/email-already-in-use") {
          mensaje = "El correo ya está registrado";
        }
        await this.helper.showAlert(mensaje, "Error");
      }

    }
  
  
  
    








}
