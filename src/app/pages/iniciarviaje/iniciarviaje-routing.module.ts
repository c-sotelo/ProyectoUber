import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IniciarviajePage } from './iniciarviaje.page';

const routes: Routes = [
  {
    path: '',
    component: IniciarviajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IniciarviajePageRoutingModule {}
