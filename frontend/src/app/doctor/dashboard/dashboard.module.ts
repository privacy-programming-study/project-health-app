import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatDialogModule } from '@angular/material/dialog';
import { IonicModule } from '@ionic/angular';
import { DashboardPageRoutingModule } from './dashboard-routing.module';
import { DashboardPage } from './dashboard.page';
import { CourseDialogComponent } from './appointment-cal-create/appointment.component';
import { FormFieldCustomControlExample, MyTimeInput } from './appointment-cal-create/custom-time-input';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppointmentInfoComponent } from './appointment-cal-info/appointment-info.component';
import { SendMailComponent } from './send-mail/send-mail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    FullCalendarModule,
    MatDialogModule,
    HttpClientModule,
    MatNativeDateModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
  ],
  declarations: [DashboardPage,CourseDialogComponent, FormFieldCustomControlExample, MyTimeInput, AppointmentInfoComponent, SendMailComponent],
  entryComponents: [CourseDialogComponent, AppointmentInfoComponent, SendMailComponent],
  bootstrap: [FormFieldCustomControlExample]
})
export class DashboardPageModule {}
