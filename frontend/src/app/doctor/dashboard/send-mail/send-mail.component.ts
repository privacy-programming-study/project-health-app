import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, NgForm } from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { AlertController } from "@ionic/angular";
import { DoctorService } from "src/api/doctor.service";
import { EmailService } from "src/api/email.service";

@Component({
    selector: 'course-dialog',
    templateUrl: './send-mail.component.html',
    styleUrls: ['./send-mail.component.scss']
})

export class SendMailComponent implements OnInit {
    @ViewChild('regfrmlog', {static: true}) form_data: NgForm;
    form: FormGroup;
    title: string;
    doctorId = JSON.parse(localStorage.getItem("DoctorData"))['docId'];
    doctorMail: string;
    patientsMail: string[] = [];

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<SendMailComponent>,
        private doctorService: DoctorService,
        private emailService: EmailService,
        private alertController: AlertController,
        @Inject(MAT_DIALOG_DATA) data
    ) {
        this.title = data.title;
    }

    ngOnInit() {
        this.form = this.fb.group({});

        // get current doctor's email address
        this.doctorService.getDoctorById(this.doctorId).subscribe((res)=>{
            this.doctorMail = res?.data.email;
        })

        // get all patients' email adresses
        this.doctorService.getPatientsMail(this.doctorId).subscribe((res)=>{
            const tmpData = res?.data;

            tmpData.forEach(element => {
                this.patientsMail.push(element.email);
            })
        })
    }

    sendMail() {
        this.emailService.doctorSendMail({
            mailText: this.form_data.value.mail_text,
            doctorMail: this.doctorMail,
            patientsMail: this.patientsMail,
            mailSubject: this.form_data.value.mail_subject
        }).subscribe((res)=>{
            if (res.error > 0) {
              this.presentError();
            }
            else if(res.error === 0) {
              this.presentEmailSuccessfullySent();
            }
        });
        
        this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close();
    }

    // No user found with given email to reset password
    async presentError() {
        const alert = await this.alertController.create({
        message: 'There was an error. The email could not be sent to all patients. Please try again later!',
        buttons: ['OK']
        });
        await alert.present();
    }

    // Email to reset password was successfully sent
    async presentEmailSuccessfullySent() {
        const alert = await this.alertController.create({
        message: 'E-mail was successfully sent to all patients!',
        buttons: ['OK']
        });
        await alert.present();
    }
}