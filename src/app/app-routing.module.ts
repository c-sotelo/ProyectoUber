import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
    
  },

  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'inicio',    
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'vehiculo',
    loadChildren: () => import('./pages/vehiculo/vehiculo.module').then( m => m.VehiculoPageModule)
  },

  {
  path: 'viaje',
  loadChildren: () => import('./pages/viaje/viaje.module').then( m => m.ViajePageModule)
  },
  {
    path: 'vehiculo',
    loadChildren: () => import('./pages/vehiculo/vehiculo.module').then( m => m.VehiculoPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'recuperarcontra',
    loadChildren: () => import('./pages/recuperarcontra/recuperarcontra.module').then( m => m.RecuperarcontraPageModule)
  },
  {
    path: 'perfilusuario',
    loadChildren: () => import('./pages/perfilusuario/perfilusuario.module').then( m => m.PerfilusuarioPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
