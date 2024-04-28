import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/api/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  @ViewChild('regfrmlog', {static: true}) form: NgForm;
  usrProf: User;
  userId = JSON.parse(localStorage.getItem("userData"))['userId'];
  constructor(private route: Router, private userService: UserService) { }

  ionViewWillEnter () {
    this.userService.getUserByToken().subscribe((res)=> {
      this.usrProf = res.data;
      let tmp_birthdate = new Date(this.usrProf.birthdate)
      this.usrProf.birthdate = tmp_birthdate.getFullYear() + '-' + ('0' + (tmp_birthdate.getMonth() + 1)).slice(-2) + '-' + ('0' + tmp_birthdate.getDate()).slice(-2);

      this.form.control.setValue({
        firstname: this.usrProf.firstname,
        lastname: this.usrProf.lastname,
        email: this.usrProf.email,
        gender: this.usrProf.gender,
        birthdate: this.usrProf.birthdate,
        address: this.usrProf.address,
        city: this.usrProf.city,
        zip: this.usrProf.zip,
        insurance_type: this.usrProf.insurance_type
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
    this.userService.editUser(this.userId, form.value).subscribe((res)=> {
      this.route.navigateByUrl('/user/profile');
     });
  }

  onLogout(){
    this.userService.onLogout();
  }

  onProfile(){
    this.route.navigateByUrl('/user/profile');
  }
 
}
