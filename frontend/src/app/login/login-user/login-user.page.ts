import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { EmailService } from 'src/api/email.service';
import { UserService } from 'src/api/user.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.page.html',
  styleUrls: ['./login-user.page.scss'],
})
export class LoginUserPage implements OnInit {
  @ViewChild('userFormLog', {static: true}) userloginform: NgForm;

  constructor(
    private emailService: EmailService,
    private route: Router,
    private alertController: AlertController,
    private userService: UserService
  ) { }

  ngOnInit() {}

  onLogin(): void{
    this.userService.onLogin(this.userloginform.value).subscribe();
  }

  // go to registrate page user
  userRegister(){
    this.route.navigateByUrl('/registrate/user')
  }

  // patient user clicks on 'Forgot password'
  onForgotPassword() {
    if(this.userloginform.value.userEmail !== '') {
      this.emailService.resetPassword({role: 'patient', email: this.userloginform.value.userEmail}).subscribe((res)=>{
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
