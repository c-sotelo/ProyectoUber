import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IniciarviajePageRoutingModule } from './iniciarviaje-routing.module';

import { IniciarviajePage } from './iniciarviaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IniciarviajePageRoutingModule
  ],
  declarations: [IniciarviajePage]
})
export class IniciarviajePageModule {}
