import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { AppointmentService } from 'src/api/appointment.service';
import { DoctorService } from 'src/api/doctor.service';
import { HealthRecordsService } from 'src/api/health-records.service';
import { Appointment } from 'src/app/models/appointment';
import { Permission } from 'src/app/models/permission';
import { PatientNames, User } from 'src/app/models/user';
import { UserService } from 'src/api/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './patient-records.page.html',
  styleUrls: ['./patient-records.page.scss'],
})
export class PatientRecordsPage implements OnInit {
  doctorId = JSON.parse(localStorage.getItem("DoctorData"))['docId'];
  @ViewChild('patient') inputPatient;
  myControl = new FormControl<string | PatientNames>('');
  patients: User[] = [];
  patient_names: PatientNames[] = [];
  filteredOptions: Observable<PatientNames[]>;

  doctorAppointmentsAll: Appointment[];
  doctorAppointmentPatientIds: number[] = [];

  permission_patient_id: number;
  permission_patient_name: string;

  permissions: Permission[];

  constructor(
    private alertController: AlertController,
    private doctorService: DoctorService,
    private appointmentService: AppointmentService,
    private healthRecordsService: HealthRecordsService,
    private userService: UserService,
    private route: Router
  ) {}

  ngOnInit() { }

  // Fetch data again, after editing profile
  ionViewDidEnter () {
    this.fetchData();
  }

  fetchData() {
    // get all requested, denied, allowed permissions
    this.healthRecordsService.getPermission(this.doctorId).subscribe((res)=>{
      this.permissions = res.data;

      this.permissions.forEach(element => {
        this.userService.getUserById(element.patient_id).subscribe((res)=>{
          element.patient = res.data.firstname + ' ' + res.data.lastname;
          element.info = {
            personalInfo: {},
            emergencyContact: [],
            insuranceInfo: {},
            physicianInfo: [],
            medicalCondition: '',
            allergies: '',
            medication: [],
            vaccination: [],
            additionalNotes: '',
          };

          this.healthRecordsService.getPersonalInfo(element.patient_id).subscribe((res) => {
            element.info.personalInfo = res.data[0];
          });
      
          this.healthRecordsService.getEmergencyContact(element.patient_id).subscribe((res) => {
            element.info.emergencyContact = res.data;
          });
      
          this.healthRecordsService.getInsuranceInfo(element.patient_id).subscribe((res) => {
            element.info.insuranceInfo = res.data[0];
          });
      
          this.healthRecordsService.getPhysicianInfo(element.patient_id).subscribe((res) => {
            element.info.physicianInfo = res.data;
          });
      
          this.healthRecordsService.getMedicalCondition(element.patient_id).subscribe((res) => {
            let tmp = res.data[0];
            element.info.medicalCondition = tmp?.medicalCondition;
          });
      
          this.healthRecordsService.getAllergies(element.patient_id).subscribe((res) => {
            let tmp = res.data[0];
            element.info.allergies = tmp?.allergies;
          });
      
          this.healthRecordsService.getMedications(element.patient_id).subscribe((res) => {
            element.info.medication = res.data;
          });
      
          this.healthRecordsService.getVaccination(element.patient_id).subscribe((res) => {
            element.info.vaccination = res.data;
          });
      
          this.healthRecordsService.getAdditionalNotes(element.patient_id).subscribe((res) => {
            let tmp = res.data[0];
            element.info.additionalNotes = tmp?.notes;
          });
        })
      });
    })

    // only suggest patient names, who have appointment with current logged doctor
    this.appointmentService.getDoctorAppointmentsAll(this.doctorId).subscribe((res)=>{
      this.doctorAppointmentsAll = res.data;
      let alreadyRequested = this.permissions?.map(e => e.patient_id);
      let tmp = this.doctorAppointmentsAll.map(appointment => appointment.user_patient_id);
      // filter out already requested patients, can't request multiple times
      this.doctorAppointmentPatientIds = tmp.filter((value, index) => tmp.indexOf(value) === index).filter(el => el !== null).filter(x => !alreadyRequested?.includes(x));
    })

    // get user's information who had at least one appointment with current logged in doctor
    this.userService.getUsersAll().subscribe((res)=>{
      let tmp = res.data;
      for (let i = 0; i < this.doctorAppointmentPatientIds.length; i++) {
        let patient_info = tmp.filter(e => e.id == this.doctorAppointmentPatientIds[i]);
        this.patients.push(patient_info[0]);
      }
      
      this.patients.forEach(element => {
        if(this.permission_patient_id != element.id) this.patient_names.push({id: element.id, name: element.firstname + ' ' + element.lastname});
      });
    })

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        this.permission_patient_id = typeof value != 'string' ? value.id : null;
        this.permission_patient_name = typeof value != 'string' ? value.name : null;
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.patient_names.slice();
      }),
    );
  }

  // autosuggest: users/patients who have at least one appointment with current logged doctor
  displayFn(patients: PatientNames): string {
    return patients && patients.name ? patients.name : '';
  }

  // filter options based on typed string
  private _filter(name: string): PatientNames[] {
    const filterValue = name.toLowerCase();
    return this.patient_names.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  // while doctor has not selected a user/patient from autosuggest yet => disable request button
  buttonDisabled() {
    return this.permission_patient_id ? false : true;
  }

  // doctor sends request
  onSubmit() {
    this.healthRecordsService.requestPermission(this.doctorId, {
      patient_id: this.permission_patient_id,
      permission: null,
      status: "requested",
    }).subscribe((res)=>{
      this.presentAlert().then(() => {
        this.inputPatient.nativeElement.value = '';
        this.patient_names = [];
        this.patients = [];
        this.fetchData();
      });
    })
  }
  
  onLogout(){
    this.doctorService.onLogout();
  }

  onEdit(){
    this.route.navigateByUrl('/doctor/edit');
  }

  onProfile(){
    this.route.navigateByUrl('/doctor/profile');
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Request Health Records',
      message: 'Patient? ' + this.permission_patient_name + '<br />',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
