import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginDoctorPage } from './login-doctor.page';
import { LoginDoctorPageRoutingModule } from './login-doctor-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    LoginDoctorPage
  ],
  imports: [
    CommonModule,
    LoginDoctorPageRoutingModule,
    CommonModule,
    FormsModule,
    IonicModule,
  ]
})
export class LoginDoctorModule { }
