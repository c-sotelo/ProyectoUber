import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  
    correo:string = "";
    contrasena:string = "";
    contraconfirm:string = "";
  
    constructor(private router:Router) { }
  
    ngOnInit() {
    }
  
  
    registro(){
    
      if (this.correo == "") {
        alert("Ingrese un correo");
        return;
      }
      if (this.contrasena == "") {
        alert("Ingrese una contraseña");
        return;
      }
      if (this.contraconfirm == "") {
        alert("confirme la contraseña");
        return;
      }
      if (this.contraconfirm === this.contrasena) {
        this.router.navigateByUrl("/inicio");
      }else{
        alert("contraseña no coincide");
      }

    }
  
  
  
    








}
