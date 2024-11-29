import { Injectable } from '@angular/core';
import { Viaje } from '../interfaces/viaje.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {
  private readonly STORAGE_KEY = 'viajes';
  private viajesSubject = new BehaviorSubject<Viaje[]>([]);
  
  constructor() {
    this.cargarViajes();
  }

  private cargarViajes(): void {
    const viajes = localStorage.getItem(this.STORAGE_KEY);
    if (viajes) {
      this.viajesSubject.next(JSON.parse(viajes));
    }
  }

  private guardarViajes(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.viajesSubject.value));
  }

  agregarViaje(viaje: Viaje): void {
    if (!viaje) return;
    
    const viajes = [viaje, ...this.viajesSubject.value];
    this.viajesSubject.next(viajes);
    this.guardarViajes();
  }

  obtenerViajes(): Observable<Viaje[]> {
    return this.viajesSubject.asObservable();
  }

  eliminarViaje(id: string): void {
    const viajes = this.viajesSubject.value.filter(v => v.id !== id);
    this.viajesSubject.next(viajes);
    this.guardarViajes();
  }
}
