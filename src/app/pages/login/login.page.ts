import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/usuario';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  correo:string = "DUOC@DUOC.cl";
  //correo:string = "tomas@tomas.cl";
  contrasena:string = "123456";
  token:string = "";
  usuario:UserModel[] = [];



  constructor(private router:Router, 
              private firebase:FirebaseService, 
              private helper:HelperService,
              private storage:StorageService,
              private usuarioService:UsuarioService
            
            ) { }

  ngOnInit() {
    
  }


  async login(){
  
    if (this.correo == "") {
      await this.helper.showAlert("Ingrese el correo", "Error");
      return;
    }
    if (this.contrasena == "") {
      await this.helper.showAlert("Ingrese la contraseña", "Error");
      return;
    }

    const loader = await this.helper.showLoader("Cargando");
    
    try {
      const response = await this.firebase.login(this.correo, this.contrasena);
      const token = await response.user?.getIdToken();

      if (token) {
        this.token = token;
        const jsonToken = [{
          "token": token,
          "usuario_correo": this.correo
        }];
        await this.storage.agregarToken(jsonToken);
        await loader.dismiss();
        await this.helper.showToast("¡Bienvenido!");
        this.router.navigateByUrl("/inicio");
      }
    } catch (error: any) {
      await loader.dismiss();
      let mensaje = "Error al iniciar sesión";
      if (error.code === "auth/invalid-credential") {
        mensaje = "Credenciales incorrectas";
      } else if (error.code === "auth/invalid-email") {
        mensaje = "Correo no válido";
      }
      await this.helper.showAlert(mensaje, "Error");
    }
  }

  resetPw(){
    this.router.navigateByUrl("reset-password");
  }

  registro(){
    this.router.navigateByUrl("registro");
  }


  recuperarcontra(){
    
  }
}
