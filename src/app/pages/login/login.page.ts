import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  correo:string = "";
  contrasena:string = "";





  constructor(private router:Router) { }

  ngOnInit() {
  }


  login(){
  
    if (this.correo == "") {
      alert("Ingrese un correo");
      return;
    }
    if (this.contrasena == "") {
      alert("Ingrese una contraseña");
      return;
    }
    if (this.correo == "benja241104@gmail.com" && this.contrasena == 'contraseña') {
      this.router.navigateByUrl("/inicio");
    }else{
      alert("Credenciales incorrectas.");
    }
    
  }

}
