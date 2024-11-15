import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { enviroment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }

  async agregarUsuario(datosUsuario:dataBodyUsuario, imgFileUser:any){
    try {
      const formData = new FormData();

      formData.append('p_nombre', datosUsuario.p_nombre);
      formData.append('p_correo_electronico',datosUsuario.p_correo_electronico);
      formData.append('p_telefono', datosUsuario.p_telefono);
      if (datosUsuario.token) {
        formData.append('token',datosUsuario.token);
      }
  
      formData.append('image_usuario', imgFileUser.file, imgFileUser.name);
  
      const response = await lastValueFrom(this.http.post<any>(enviroment.apiUrl + 'user/agregar',formData));
      return response;
      
    } catch (error) {
      throw error;
    }

  }


  async obtenerUsuario(data:dataGetUser){
    try {
      const params = {
        p_correo: data.p_correo,
        token:data.token
      }
      const response = await lastValueFrom(this.http.get<any>(enviroment.apiUrl + 'user/obtener',{params}));
      return response;
    } catch (error) {
      throw error;
    }
  }


}

interface dataBodyUsuario{
  p_nombre:string;
  p_correo_electronico:string;
  p_telefono:string;
  token?:string;
}

interface dataGetUser{
  p_correo:string;
  token:string;
}