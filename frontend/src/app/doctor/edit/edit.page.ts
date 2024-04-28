import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, Validators } from '@angular/forms';
import { DoctorService } from 'src/api/doctor.service';
import { Doctor } from 'src/app/models/doctor';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  @ViewChild('regfrmlog', {static: true}) form: NgForm;
  doctor: Doctor;
  docId = JSON.parse(localStorage.getItem("DoctorData"))['docId'];

  constructor(private doctorService: DoctorService, private route: Router) { }

  ionViewWillEnter () {
    this.doctorService.getDoctorByToken().subscribe((res)=> {
      this.doctor = res.data;
      let tmp_birthdate = new Date(this.doctor.birthdate);
      this.doctor.birthdate = tmp_birthdate.getFullYear() + '-' + ('0' + (tmp_birthdate.getMonth() + 1)).slice(-2) + '-' + ('0' + tmp_birthdate.getDate()).slice(-2);

      this.form.control.setValue({
        firstname: this.doctor.firstname,
        lastname: this.doctor.lastname,
        email: this.doctor.email,
        gender: this.doctor.gender,
        birthdate: this.doctor.birthdate,
        work_address: this.doctor.work_address,
        work_city: this.doctor.work_city,
        work_zip: this.doctor.work_zip,
        specialization_type: this.doctor.specialization_type.split(' (')[0].split(','),
        other_specialization_type: this.doctor.specialization_type.split(' (')[1]?.slice(0, -1) || ''
      });
    })
  }

  ngOnInit(){}

  numberOnlyValidation(event: any) {
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  onSave(form: NgForm) {
    this.form.value.specialization_type = this.form.value.specialization_type.toString();
    if(this.form.value.specialization_type.includes('Other') && this.form.value.other_specialization_type != '') {
      this.form.value.specialization_type = this.form.value.specialization_type.replace('Other', 'Other (' + this.form.value.other_specialization_type + ')')
    }
    this.doctorService.editDoctor(this.docId, form.value).subscribe((res)=> {
      this.route.navigateByUrl('/doctor/profile');
     });
  }

  // show/hide other_specialization_type input depending whether 'Other' was selected
  onSpecialization() {
    if(this.form.value.specialization_type?.toString().includes('Other')) {
      this.form.form.get('other_specialization_type')?.setValidators([Validators.required])
      this.form.form.get('other_specialization_type')?.updateValueAndValidity()
      return false
    }
    else {
      this.form.form.get('other_specialization_type')?.setValue('')
      this.form.form.get('other_specialization_type')?.clearValidators()
      this.form.form.get('other_specialization_type')?.updateValueAndValidity()
      return true
    }
  }

  onLogout(){
    this.doctorService.onLogout();
  }

  onProfile(){
    this.route.navigateByUrl('/doctor/profile');
  }
 
}
