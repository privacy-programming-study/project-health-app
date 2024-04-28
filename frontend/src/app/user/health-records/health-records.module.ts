import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HealthRecordsPageRoutingModule } from './health-records-routing.module';

import { HealthRecordsPage } from './health-records.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HealthRecordsPageRoutingModule
  ],
  declarations: [HealthRecordsPage]
})
export class HealthRecordsPageModule {}
