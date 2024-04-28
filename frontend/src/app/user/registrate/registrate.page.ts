import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from 'src/api/user.service';

@Component({
  selector: 'app-registrate',
  templateUrl: './registrate.page.html',
  styleUrls: ['./registrate.page.scss'],
})
export class RegistratePage implements OnInit {
  @ViewChild('regfrmlog', {static: true}) form: NgForm;
  backendMsg: string;

  terms: boolean = false;
  isModalOpen = false;

  constructor(private userService: UserService, private alertController: AlertController, private route: Router) { }

  ngOnInit() {}

  // modal for terms and condition
  setOpenModal(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  agreeTerms() {
    this.terms = !this.terms;
  }

  passwordVerify(){
    if((this.form.value.password != this.form.value.regverifypassword) && this.form.value.regverifypassword.length > 1) {
      return true;
    }
    return false;
  }

  numberOnlyValidation(event: any) {
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  onRegSubmit(){
    this.userService.createUser(this.form.value).subscribe((res)=> {
      if (res.success === 1) {
        this.backendMsg = "Registration was successful!", 
        this.presentAlert(
          {
            text: 'Login now',
            handler: () => {
              this.route.navigateByUrl('/');
            }
          }
        )
      }
      else if (res.success === 0) {
        if (res.errorNo === 1292) {
          this.backendMsg = 'Incorrect date value! Please follow this format: YYYY-MM-DD',
          this.presentAlert('OK')
        }
        else {
          this.backendMsg = 'There are still some errors!',
          this.presentAlert('OK')
        }
      }
    },
    (error)=> {
      this.backendMsg = 'There are still some errors!',
      this.presentAlert('OK')
    });
  }

  async presentAlert(button: any) {
    const alert = await this.alertController.create({
      message: this.backendMsg,
      buttons: [button],
    });
    await alert.present();
  }
}
