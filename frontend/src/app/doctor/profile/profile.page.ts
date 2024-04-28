import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from 'src/api/doctor.service';
import { Doctor } from 'src/app/models/doctor';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {
  doctor: Doctor;
  constructor(private doctorService: DoctorService, private route: Router) { }

  ngOnInit() { }

  // Fetch data again, after editing profile
  ionViewDidEnter () {
    this.fetchData();
  }

  fetchData() {
    this.doctorService.getDoctorByToken().subscribe((res)=>{
      this.doctor = res.data;
      this.doctor.specialization_type = this.doctor.specialization_type?.replace(/,/g, ', ');
    } )
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
}
