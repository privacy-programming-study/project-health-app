import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DoctorService } from 'src/api/doctor.service';
import { UserService } from 'src/api/user.service';
import { Doctor, DoctorNameSpecialization } from 'src/app/models/doctor';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})

export class SearchPage implements OnInit {
  myControl = new FormControl<string | DoctorNameSpecialization>('');
  doctors: Doctor[];
  doctor_names: DoctorNameSpecialization[] = []; // doctor names to display in the suggestion
  filteredOptions: Observable<DoctorNameSpecialization[]>;
  filteredDoctorNames: DoctorNameSpecialization[]; // display suggestions of doctor names with specialization according to the search string
  filteredDoctorsInfo: Doctor[] = []; // display filtered doctor information as cards

  appointment_doctor: string;
  appointment_doctor_id: number;
  appointment_doctor_type: string;

  constructor(private userService: UserService, private doctorService: DoctorService, private route: Router) { 
    // get all doctors in the database
    this.doctorService.getDoctorsAll().subscribe((res)=>{
      this.doctors = res.data;
      
      this.doctors.forEach(element => {
        this.doctor_names.push({id: element.id, name: element.firstname + ' ' + element.lastname + ' (' + element.specialization_type + ')', specialization_type: element.specialization_type});
      });
    })
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

  // display selected suggestion in the search input
  displayFn(selectedDoctor: DoctorNameSpecialization): string {
    return selectedDoctor && selectedDoctor.name ? selectedDoctor.name : '';
  }

  // filter suggestions based on typed string
  private _filter(name: string): DoctorNameSpecialization[] {
    const filterValue = name.toLowerCase();
    this.filteredDoctorNames = this.doctor_names.filter(option => option.name.toLowerCase().includes(filterValue));

    this.filteredDoctorNames.forEach((doctorName) => {
      this.doctorService.getDoctorById(doctorName.id).subscribe((res)=>{
        let tmp = res.data;
        this.filteredDoctorsInfo.push(tmp);
      })
    })
    this.filteredDoctorsInfo = [];
    return this.doctor_names.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  onLogout(){
    this.userService.onLogout();
  }

  onProfile(){
    this.route.navigateByUrl('/user/profile');
  }

}
