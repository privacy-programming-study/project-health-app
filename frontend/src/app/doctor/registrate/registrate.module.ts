import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistratePageRoutingModule } from './registrate-routing.module';

import { RegistratePage } from './registrate.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistratePageRoutingModule,
    HttpClientModule
  ],
  declarations: [RegistratePage]
})
export class RegistratePageModule {}
