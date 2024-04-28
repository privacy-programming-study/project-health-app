import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DoctorService } from 'src/api/doctor.service';
import { EmailService } from 'src/api/email.service';

@Component({
  selector: 'app-login-doctor',
  templateUrl: './login-doctor.page.html',
  styleUrls: ['./login-doctor.page.scss'],
})
export class LoginDoctorPage implements OnInit {
  @ViewChild('docFormLog', {static: true}) docloginform: NgForm;

  constructor(
    private doctorService: DoctorService,
    private emailService: EmailService,
    private route: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {}

  onDocLogin(): void{
    this.doctorService.onLogin(this.docloginform.value).subscribe();
  }

  // go to registrate page doctor
  docRegister(){
    this.route.navigateByUrl('/registrate/doctor')
  }

  // doctor user clicks on 'Forgot password'
  onForgotPassword() {
    if(this.docloginform.value.docEmail !== '') {
      this.emailService.resetPassword({role: 'doctor', email: this.docloginform.value.docEmail}).subscribe((res)=>{
        if (res.user === null) {
          this.presentNoUserFound();
        }
        else {
          this.presentEmailSuccessfullySent();
        }
      });
    }
    else {
      this.presentInvalidEmail();
    }
  }

  // No email given to reset password
  async presentInvalidEmail() {
    const alert = await this.alertController.create({
      message: 'No email address is given',
      buttons: ['OK']
    });
    await alert.present();
  }

  // No user found with given email to reset password
  async presentNoUserFound() {
    const alert = await this.alertController.create({
      message: 'Couldn\'t find account with given e-mail address. Please try again!',
      buttons: ['OK']
    });
    await alert.present();
  }

  // Email to reset password was successfully sent
  async presentEmailSuccessfullySent() {
    const alert = await this.alertController.create({
      message: 'Reset password e-mail was successfully sent!',
      buttons: ['OK']
    });
    await alert.present();
  }

}
