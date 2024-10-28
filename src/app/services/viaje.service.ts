import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { enviroment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  constructor(private http:HttpClient) { }


  async obtenerViaje(parToken:string){
    try {
      const params = {
        token:parToken
      };
      const response = await lastValueFrom(this.http.get<any>(enviroment.apiUrl + 'viaje/obtener',{params}));
      return response;
    } catch (error) {
      throw error;
    }
  }


}
