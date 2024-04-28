import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Permission } from 'src/app/models/permission';
import { Appointment } from 'src/app/models/appointment';
import { dateFormatting } from 'src/app/utils/dateFormatting';
import { AppointmentService } from 'src/api/appointment.service';
import { DoctorService } from 'src/api/doctor.service';
import { HealthRecordsService } from 'src/api/health-records.service';
import { UserService } from 'src/api/user.service';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  userId = JSON.parse(localStorage.getItem("userData"))['userId'];
  userAppointmentsAll: Appointment[];
  userAppointmentsToday: Appointment[];
  userAppointmentsUpcoming: Appointment[];
  userAppointmentsRequested: Appointment[];
  userAppointmentsDeclined: Appointment[];
  permissionRequested: Permission[];
  todayDate = new Date();
  
  constructor(
    private appointmentService: AppointmentService,
    private alertController: AlertController,
    private doctorService: DoctorService,
    private healthRecordsService: HealthRecordsService,
    private userService: UserService,
    private route: Router
  ) { }

  onLogout(){
    this.userService.onLogout();
  }

  onProfile(){
    this.route.navigateByUrl('/user/profile');
  }

  // Fetch data again, when visting page again
  // Get newly made appointments
  ionViewWillEnter () {
    this.fetchData();
  }

  fetchData() {
    // fetch all user's appointments
    this.appointmentService.getUserAppointmentsAll(this.userId).subscribe((res)=>{
      this.userAppointmentsAll = res.data;
      
      this.userAppointmentsAll.forEach(element => {
        this.doctorService.getDoctorById(element.appointment_doctor_id).subscribe((res)=>{
          element.doctor = res?.data.firstname + ' ' + res?.data.lastname;
          element.place = res?.data.work_address + ', ' + res?.data.work_zip + ' ' + res?.data.work_city
        })

        element.appointment_date = dateFormatting(element.appointment_date);
        element.appointment_time = element.appointment_time.substring(0, 5);
      });

      // filter today's appointments
      this.userAppointmentsToday = this.userAppointmentsAll.filter((appointment) =>
        appointment.appointment_date == dateFormatting()
        && appointment.appointment_status == 'accepted'
      );

      // filter upcoming appointments
      this.userAppointmentsUpcoming = this.userAppointmentsAll.filter((appointment) =>
        new Date(appointment.appointment_date).setHours(0,0,0,0) > new Date(this.todayDate).setHours(0,0,0,0)
        && (appointment.appointment_status == 'accepted' || appointment.appointment_status == 'canceled')
      );

      // filter requested appointments
      this.userAppointmentsRequested = this.userAppointmentsAll.filter((appointment) =>
        new Date(appointment.appointment_date).setHours(0,0,0,0) > new Date(this.todayDate).setHours(0,0,0,0)
        && appointment.appointment_status == 'requested'
      );

      // filter delined appointments
      this.userAppointmentsDeclined = this.userAppointmentsAll.filter((appointment) =>
        new Date(appointment.appointment_date).setHours(0,0,0,0) > new Date(this.todayDate).setHours(0,0,0,0)
        && appointment.appointment_status == 'declined'
      );
    })

    // get requested permissions to see medical health record
    this.healthRecordsService.getRequestedPermission(this.userId).subscribe((res)=>{
      this.permissionRequested = res?.data;
      
      this.permissionRequested.forEach(element => {
        this.doctorService.getDoctorById(element.doctor_id).subscribe((res)=>{
          element.doctor = 'Dr. ' + res?.data.firstname + ' ' + res?.data.lastname;
        })
      });
    })
  }

  ngOnInit() { }

  // delete declined or still requested appointments
  onAppointmentDelete(appointmentId: number) {
    this.appointmentService.deleteAppointment(appointmentId).subscribe((res)=>{
      this.userAppointmentsAll = this.userAppointmentsAll.filter(element => element.id != appointmentId);
      this.userAppointmentsDeclined = this.userAppointmentsDeclined.filter(element => element.id != appointmentId);
      this.userAppointmentsRequested = this.userAppointmentsRequested.filter(element => element.id != appointmentId);
    })
  }

  // cancel upcoming accepted appointments
  onAppointmentCancel(userId: number, appointment: Appointment) {
    this.appointmentService.cancelAppointment(userId, appointment).subscribe((res)=>{
      this.userAppointmentsAll.forEach(element => {
        if(element.id == appointment.id) {
          element.appointment_status = 'canceled'
        }
      });
  
      this.userAppointmentsUpcoming.forEach(element => {
        if(element.id == appointment.id) {
          element.appointment_status = 'canceled'
        }
      });
    })
  }

  // allow doctor to see medical health record
  onPermissionAllow(requestedPermission: Permission) {
    this.healthRecordsService.allowPermission(this.userId, {
      permission: true,
      status: "done",
      id: requestedPermission.id,
    }).subscribe((res)=>{
      this.healthRecordsService.getRequestedPermission(this.userId).subscribe((res)=>{
        this.permissionRequested = res?.data;
        
        this.permissionRequested.forEach(element => {
          this.doctorService.getDoctorById(element.doctor_id).subscribe((res)=>{
            element.doctor = 'Dr. ' + res?.data.firstname + ' ' + res?.data.lastname;
          })
        });
      })
    })
  }

  // do not allow doctor to see medical health record
  onPermissionNoAllow(requestedPermission: Permission) {
    this.healthRecordsService.allowPermission(this.userId, {
      permission: false,
      status: "done",
      id: requestedPermission.id,
    }).subscribe((res)=>{
      this.healthRecordsService.getRequestedPermission(this.userId).subscribe((res)=>{
        this.permissionRequested = res?.data;
        
        this.permissionRequested.forEach(element => {
          this.doctorService.getDoctorById(element.doctor_id).subscribe((res)=>{
            element.doctor = 'Dr. ' + res?.data.firstname + ' ' + res?.data.lastname;
          })
        });
      })
    })
  }

  // alert according to action being done
  async presentAlert(appointment?: Appointment, userId?: number, action?: string, permission?: Permission) {
    const alert = await this.alertController.create({
      header:
        action == 'cancel_accepted' || action == 'cancel_requested' ? 'Cancel Appointment'
        : action == 'delete_declined' ? 'Remove Appointment'
        : action == 'grant_permission' ? 'Allow insight into medical health records'
        : action == 'deny_permission' ? 'Do not allow insight into medical health records' : '',
      subHeader:
        action == 'cancel_accepted' || action == 'cancel_requested' ? 'Do you really want to cancel the following appointment?'
        : action == 'delete_declined' ? 'Do you really want to remove the following appointment?'
        : action == 'grant_permission' ? 'Do you really want to allow ' + permission.doctor + 'to see your medical health records?'
        : action == 'deny_permission' ? 'Do you really want to deny ' + permission.doctor + 'to see your medical health records?' : '',
      message:
        action == 'cancel_accepted' || action == 'cancel_requested' || action == 'delete_declined' ? 'Doctor? ' + appointment.doctor + '<br />'
          + 'When? ' + appointment.appointment_date + ', ' + appointment.appointment_time?.substring(0, 5) + '<br />'
          + 'Reason? ' + appointment.appointment_reason
        : '',
      buttons: [
        {
          text: 'Cancel',
          handler: () => { },
        },
        {
          text: 'Yes',
          handler: () => {
            if(action == 'cancel_accepted') this.onAppointmentCancel(userId, appointment);
            else if(action == 'cancel_requested' || action == 'delete_declined') this.onAppointmentDelete(appointment.id);
            else if(action == 'grant_permission') this.onPermissionAllow(permission);
            else if(action == 'deny_permission') this.onPermissionNoAllow(permission);
          },
        },
      ],
    });
    await alert.present();
    await alert.onDidDismiss();
  }
}
