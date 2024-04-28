import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginUserPage } from './login-user.page';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginUserPageRoutingModule } from './login-user-routing.module';



@NgModule({
  declarations: [
    LoginUserPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginUserPageRoutingModule
  ]
})
export class LoginUserModule { }
