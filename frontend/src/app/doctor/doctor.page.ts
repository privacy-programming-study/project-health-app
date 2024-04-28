import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/api/doctor.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.page.html',
})

export class DoctorPage implements OnInit {

  constructor(private doctorService: DoctorService) { }

  ngOnInit() { }

  onLogout(){
    this.doctorService.onLogout();
  }

}
