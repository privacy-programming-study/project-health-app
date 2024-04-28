import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/api/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {
  usrProf: User;
  constructor(private route: Router, private userService: UserService) { }

  ngOnInit(){ }

  // Fetch data again, after editing profile
  ionViewDidEnter () {
    this.fetchData();
  }

  fetchData() {
    this.userService.getUserByToken().subscribe((res)=>{
      this.usrProf = res.data;
      let tmp_birthdate = new Date(this.usrProf.birthdate)
      this.usrProf.birthdate = tmp_birthdate.getFullYear() + '-' + ('0' + (tmp_birthdate.getMonth() + 1)).slice(-2) + '-' + ('0' + tmp_birthdate.getDate()).slice(-2);
    })
  }
  
  onLogout(){
    this.userService.onLogout();
  }

  onEdit(){
    this.route.navigateByUrl('/user/edit');
  }

  onProfile(){
    this.route.navigateByUrl('/user/profile');
  }
 
}
