import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private currentUser = new BehaviorSubject<any>(null);

  constructor() {
    // Verificar si hay una sesión guardada
    const savedSession = localStorage.getItem('currentUser');
    if (savedSession) {
      this.currentUser.next(JSON.parse(savedSession));
      this.isAuthenticated.next(true);
      console.log('%c Usuario ya autenticado', 'background: #4CAF50; color: white; padding: 5px; border-radius: 5px;');
    }
  }

  login(email: string, password: string): Promise<boolean> {
    // Aquí iría tu lógica real de autenticación
    return new Promise((resolve, reject) => {
      // Simulación de login
      setTimeout(() => {
        const user = { email, id: Date.now() };
        this.currentUser.next(user);
        this.isAuthenticated.next(true);
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        console.log('%c ¡Login exitoso!', 'background: #4CAF50; color: white; padding: 5px; border-radius: 5px;');
        console.log('Usuario:', email);
        console.log('Fecha:', new Date().toLocaleString());
        
        resolve(true);
      }, 1000);
    });
  }

  register(email: string, password: string): Promise<boolean> {
    // Aquí iría tu lógica real de registro
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = { email, id: Date.now() };
        this.currentUser.next(user);
        this.isAuthenticated.next(true);
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        console.log('%c ¡Registro exitoso!', 'background: #2196F3; color: white; padding: 5px; border-radius: 5px;');
        console.log('Nuevo usuario:', email);
        console.log('Fecha de registro:', new Date().toLocaleString());
        
        resolve(true);
      }, 1000);
    });
  }

  logout(): void {
    this.currentUser.next(null);
    this.isAuthenticated.next(false);
    localStorage.removeItem('currentUser');
    
    console.log('%c Sesión cerrada', 'background: #FF5722; color: white; padding: 5px; border-radius: 5px;');
  }

  isLoggedIn() {
    return this.isAuthenticated.asObservable();
  }

  getCurrentUser() {
    return this.currentUser.asObservable();
  }
} 