import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginDoctorPage } from './login-doctor.page'; 

const routes: Routes = [
  {
    path: '',
    component: LoginDoctorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginDoctorPageRoutingModule {}