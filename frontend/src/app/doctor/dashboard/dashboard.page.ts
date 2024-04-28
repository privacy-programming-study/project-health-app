import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CourseDialogComponent } from './appointment-cal-create/appointment.component';
import { AppointmentInfoComponent } from './appointment-cal-info/appointment-info.component';
import { formatDate } from '@angular/common';
import { Appointment, AppointmentsCalendar } from 'src/app/models/appointment';
import { dateFormatting, dateFormattingCalendar } from 'src/app/utils/dateFormatting';
import { AppointmentService } from 'src/api/appointment.service';
import { DoctorService } from 'src/api/doctor.service';
import { Doctor } from 'src/app/models/doctor';
import { UserService } from 'src/api/user.service';
import { SendMailComponent } from './send-mail/send-mail.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {
  doctor: Doctor;
  doctorId = JSON.parse(localStorage.getItem("DoctorData"))['docId'];
  doctorAppointmentsToday: Appointment[];
  doctorAppointmentsUpcoming: Appointment[];
  doctorAppointmentsRequested: Appointment[];
  doctorAppointmentsAll: Appointment[];
  appointmentsCal: AppointmentsCalendar[] = [];
  
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    height: 'auto',
    eventClick: this.openAppointmentInfo.bind(this),
    dateClick: this.openMakeAppointment.bind(this),
    eventTimeFormat: { // like '14:30:00'
      hour: '2-digit',
      minute: '2-digit',
      meridiem: false
    }
  };

  constructor(
    private dialog: MatDialog,
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private alertController: AlertController,
    private userService: UserService,
    private route: Router
  ) { }

  // Fetch data again, when visting page again
  // Get newly made appointments
  ionViewWillEnter () {
    this.fetchData();
  }

  onProfile(){
    this.route.navigateByUrl('/doctor/profile');
  }

  onLogout(){
    this.doctorService.onLogout();
  }

  // doctor clicks on appointment in calendar => modal with information
  openSendAwayMail() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass='dialog';
    dialogConfig.data = {
      id: 1,
      title: 'Send Mail to All Patients'
    };
    this.dialog.open(SendMailComponent, dialogConfig);
  }

  // doctor clicks on appointment in calendar => modal with information
  openAppointmentInfo(arg) {
    arg.jsEvent.preventDefault();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass='dialog';
    dialogConfig.data = {
      id: 1,
      patient: arg.event.title,
      reason: arg.event.url,
      date: formatDate(arg.event.start, 'yyyy-MM-dd', 'en-US'),
      time: formatDate(arg.event.start, 'hh:mm', 'en-US')
    };
    this.dialog.open(AppointmentInfoComponent, dialogConfig);
  }

  // doctor clicks on date in calendat => modal to make appointment
  openMakeAppointment(arg) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass='dialog';
    dialogConfig.data = {
      id: 1,
      title: arg.dateStr
    };
    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {this.fetchData(); this.fetchData();}
    );
  }

  fetchData() {
    // fetch all doctor's appointments
    this.appointmentService.getDoctorAppointmentsAll(this.doctorId).subscribe((res)=>{
      this.doctorAppointmentsAll = res.data;

      this.doctorAppointmentsAll.forEach(element => {
        element.date_time = dateFormattingCalendar(element.appointment_date, element.appointment_time);

        if(element.user_patient_id) {
          this.userService.getUserById(element.user_patient_id).subscribe((res)=>{
            element.patient = res.data?.firstname + ' ' + res.data?.lastname;

            // add object for visualization in calendar
            if(element.appointment_status == 'accepted') this.appointmentsCal.push({
              id: element.id,
              title: element.patient,
              start: element.date_time,
              url: element.appointment_reason
            });
          })
        }
        else {
          element.patient = element.patient_name;

          // add formatted object for visualization in calendar
          if(element.appointment_status == 'accepted') this.appointmentsCal.push({
            id: element.id,
            title: element.patient,
            start: element.date_time,
            url: element.appointment_reason
          });
        }

        element.appointment_date = dateFormatting(element.appointment_date);
        element.appointment_time = element.appointment_time.substring(0, 5);
      });

      // filter today's appointments
      this.doctorAppointmentsToday = this.doctorAppointmentsAll.filter((appointment) =>
        appointment.appointment_date == dateFormatting()
        && appointment.appointment_status == 'accepted'
      );

      // filter upcoming appointments
      this.doctorAppointmentsUpcoming = this.doctorAppointmentsAll.filter((appointment) =>
        new Date(appointment.appointment_date).setHours(0,0,0,0) > new Date().setHours(0,0,0,0)
        && (appointment.appointment_status == 'accepted' || appointment.appointment_status == 'canceled')
      );

      // filter requested appointments
      this.doctorAppointmentsRequested = this.doctorAppointmentsAll.filter((appointment) =>
        new Date(appointment.appointment_date).setHours(0,0,0,0) > new Date().setHours(0,0,0,0)
        && appointment.appointment_status == 'requested'
      );
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.calendarOptions.footerToolbar = false;
    }, 300)

    // fetch doctor's data
    this.doctorService.getDoctorByToken().subscribe((res)=>{
      this.doctor = res.data;
    })
  }

  // cancel accepted appointment
  onAppointmentCancel(doctorId: number, appointment: Appointment) {
    this.appointmentService.cancelDoctorAppointment(doctorId, appointment).subscribe((res)=>{
      this.doctorAppointmentsAll.forEach(element => {
        if(element.id == appointment.id) {
          element.appointment_status = 'canceled'
        }
      });

      this.doctorAppointmentsUpcoming.forEach(element => {
        if(element.id == appointment.id) {
          element.appointment_status = 'canceled'
        }
      });

      this.appointmentsCal = this.appointmentsCal.filter(element => element.id != appointment.id);
    })
  }

  // accept requested appointment
  onAppointmentAccept(doctorId: number, appointment: Appointment) {
    this.appointmentService.acceptAppointment(doctorId, appointment).subscribe((res)=>{
      this.doctorAppointmentsAll.forEach(element => {
        if(element.id == appointment.id) {
          element.appointment_status = 'accepted'
        }
      });

      this.doctorAppointmentsUpcoming.push(appointment);

      this.appointmentsCal.push({
        id: appointment.id,
        title: appointment.patient,
        start: appointment.date_time,
        url: appointment.appointment_reason
      });

      this.doctorAppointmentsRequested = this.doctorAppointmentsRequested.filter(element => element.id != appointment.id);
    })
  }

  // decline requested appointment
  onAppointmentDecline(doctorId: number, appointment: Appointment) {
    this.appointmentService.declineAppointment(doctorId, appointment).subscribe((res)=>{
      this.doctorAppointmentsAll.forEach(element => {
        if(element.id == appointment.id) {
          element.appointment_status = 'declined'
        }
      });

      this.doctorAppointmentsRequested = this.doctorAppointmentsRequested.filter(element => element.id != appointment.id);
    })
  }

  // alert according to action being done
  async presentAlert(doctorId: number, appointment: Appointment, action?: string) {
    const alert = await this.alertController.create({
      header: 
        action == 'cancel' ? 'Cancel Appointment'
        : action == 'accept' ? 'Accept Appointment'
        : action == 'decline' ? 'Decline Appointment' : '',
      subHeader:
        action == 'cancel' ? 'Do you really want to cancel the following appointment?'
        : action == 'accept' ? 'Do you really want to accept the following appointment?'
        : action == 'decline' ? 'Do you really want to decline the following appointment?' : '',
      message: 'Patient? ' + appointment.patient + '<br />'
          + 'When? ' + appointment.appointment_date + ', ' + appointment.appointment_time.substring(0, 5) + '<br />'
          + 'Reason? ' + appointment.appointment_reason,
      buttons: [
        {
          text: 'No',
          handler: () => { },
        },
        {
          text: 'Yes',
          handler: () => {
            if(action == 'cancel') this.onAppointmentCancel(doctorId, appointment);
            else if(action == 'accept') this.onAppointmentAccept(doctorId, appointment);
            else if(action == 'decline') this.onAppointmentDecline(doctorId, appointment);
          },
        },
      ],
    });
    await alert.present();
    await alert.onDidDismiss();
  }
}
