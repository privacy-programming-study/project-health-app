import { Component, OnInit, ViewChild } from '@angular/core';
import { format, parseISO } from 'date-fns';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AppointmentService } from 'src/api/appointment.service';
import { DoctorService } from 'src/api/doctor.service';
import { UserService } from 'src/api/user.service';
import { Doctor, DoctorNameSpecialization } from 'src/app/models/doctor';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
})

export class AppointmentPage implements OnInit {
  @ViewChild('doctor') inputDoctor;
  @ViewChild('reason') inputReason;

  userId = JSON.parse(localStorage.getItem("userData"))['userId'];
  modes = ['date'];
  selectedMode = 'date';
  showPicker = true;
  dateValue = format(new Date(), 'yyyy-MM-dd')+ 'T09:00:00';
  formattedString = '';

  myControl = new FormControl<string | DoctorNameSpecialization>('');
  doctors: Doctor[];
  doctor_names: DoctorNameSpecialization[] = [];
  filteredOptions: Observable<DoctorNameSpecialization[]>;

  appointment_doctor: string;
  appointment_doctor_id: number;
  appointment_date: string;
  appointment_time: string;
  appointment_reason: string;
  appointment_doctor_type: string;

  constructor(private userService: UserService, private doctorService: DoctorService, private appointmentService: AppointmentService, private alertController: AlertController, private route: Router) {
    this.setToday();

    // get all doctors in the system => used for the autosuggest when selecting a doctor
    this.doctorService.getDoctorsAll().subscribe((res)=>{
      this.doctors = res.data;
      
      this.doctors.forEach(element => {
        this.doctor_names.push({id: element.id, name: element.firstname + ' ' + element.lastname + ' (' + element.specialization_type + ')', specialization_type: element.specialization_type});
      });
    })
  }

  onLogout(){
    this.userService.onLogout();
  }

  onProfile(){
    this.route.navigateByUrl('/user/profile');
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        this.appointment_doctor_id = typeof value != 'string' ? value.id : null;
        this.appointment_doctor_type = typeof value != 'string' ? value.specialization_type : null;
        this.appointment_doctor = typeof value != 'string' ? value.name : null;
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.doctor_names.slice();
      }),
    );
  }

  onReasonChange(reason: string) {
    this.appointment_reason = reason;
  }

  // autosuggest: all doctors in database
  displayFn(doctors: DoctorNameSpecialization): string {
    return doctors && doctors.name ? doctors.name : '';
  }

  // filter options based on typed string
  private _filter(name: string): DoctorNameSpecialization[] {
    const filterValue = name.toLowerCase()

    return this.doctor_names.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  setToday(){
    this.formattedString = format(parseISO(format(new Date(), 'yyyy-MM-dd')+'T09:00:00'),'HH:mm, MMM d, yyyy');
    this.appointment_date = format(parseISO(format(new Date(), 'yyyy-MM-dd')+'T09:00:00'), 'yyyy-MM-dd');
    this.appointment_time = format(parseISO(format(new Date(), 'yyyy-MM-dd')+'T09:00:00'), 'HH:mm:ss');
  }
  
  dateChanged(value){
    this.dateValue = value;
    this.formattedString = format(parseISO(value), 'HH:mm, MMM d, yyyy');
    this.showPicker = false;

    this.appointment_date = format(parseISO(value), 'yyyy-MM-dd');
    this.appointment_time = format(parseISO(value), 'HH:mm:ss');
  
  }

  buttonDisabled() {
    return this.appointment_doctor_id ? (this.appointment_reason ? (this.showPicker === false ? false : true) : true) : true;
  }

  // user/patient makes/requests an appointment
  onSubmit(): void {
    this.appointmentService.makeAppointment(this.userId, {
      appointment_date: this.appointment_date,
      appointment_time: this.appointment_time,
      appointment_doctor_type: this.appointment_doctor_type,
      appointment_doctor_id: this.appointment_doctor_id,
      appointment_reason: this.appointment_reason
    }).subscribe((res)=>{
      this.presentAlert().then(() => {
        this.inputDoctor.nativeElement.value = '';
        this.inputReason.nativeElement.value = '';
        this.modes = ['date'];
        this.selectedMode = 'date';
        this.showPicker = true;
        this.dateValue = format(new Date(), 'yyyy-MM-dd')+ 'T09:00:00';
        this.formattedString = '';
      });
    })
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Request Appointment',
      message: 'Doctor? ' + this.appointment_doctor + '<br />'
      + 'When? ' + this.appointment_date + ', ' + this.appointment_time.substring(0, 5) + '<br />'
      + 'Reason? ' + this.appointment_reason,
      buttons: ['OK'],
    });

    await alert.present();
  }

}
