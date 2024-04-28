import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page'; 

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
    children: [
      {
        path: 'user',
        loadChildren: () => import('./login-user/login-user.module').then( m => m.LoginUserModule)
      },
      {
        path: 'doctor',
        loadChildren: () => import('./login-doctor/login-doctor.module').then( m => m.LoginDoctorModule)
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
