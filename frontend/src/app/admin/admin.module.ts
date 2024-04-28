import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MatTableModule } from '@angular/material/table';
import { AdminPageRoutingModule } from './admin-routing.module';
import { AdminPage } from './admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule,
    MatTableModule
  ],
  declarations: [AdminPage]
})
export class AdminPageModule {}
