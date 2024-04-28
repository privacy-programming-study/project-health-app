import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepagePage } from './homepage.page';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomepagePageRoutingModule } from './homepage-routing.module';



@NgModule({
  declarations: [
    HomepagePage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomepagePageRoutingModule
  ]
})
export class HomepageModule { }