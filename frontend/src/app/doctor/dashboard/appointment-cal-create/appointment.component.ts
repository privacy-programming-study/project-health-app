import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, NgForm } from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { AppointmentService } from "src/api/appointment.service";

@Component({
    selector: 'course-dialog',
    templateUrl: './appointment.component.html',
    styleUrls: ['./appointment.component.scss']
})

export class CourseDialogComponent implements OnInit {
    @ViewChild('regfrmlog', {static: true}) form_data: NgForm;
    form: FormGroup;
    date: string;
    doctorId = JSON.parse(localStorage.getItem("DoctorData"))['docId'];

    @ViewChild("appointment_time") appointment_time: NgForm;

    constructor(
        private appointmentService: AppointmentService,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data
    ) {
        this.date = data.title;
    }

    ngOnInit() {
        this.form = this.fb.group({
            date: [this.date, []]
        });
    }

    save() {
        if (Number(this.appointment_time?.form?.value?.appointment_time?.hour) > 23 || Number(this.appointment_time?.form?.value?.appointment_time?.minute > 59)) {
            alert('Invalid time! Hour between 0-23 and Minute between 0-59!');
            return;
        }

        const time = this.appointment_time.form.value.appointment_time.hour + ':' + this.appointment_time.form.value.appointment_time.minute
        this.appointmentService.makeAppointmentDoctor(this.doctorId, {
            appointment_date: this.date,
            appointment_time: time,
            appointment_doctor_type: null,
            appointment_doctor_id: this.doctorId,
            appointment_reason: this.form_data.value.appointment_reason,
            patient_name: this.form_data.value.patient_name
        }).subscribe((res)=>{ })
        
        this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close();
    }

    buttonDisabled() {
        if (this.appointment_time?.form?.value?.appointment_time?.hour == undefined && this.appointment_time?.form?.value?.appointment_time?.minute == undefined) {
            return true
        } else if (this.appointment_time?.form?.value?.appointment_time?.hour == '' && this.appointment_time?.form?.value?.appointment_time?.minute == '') {
            return true
        }

        if (isNaN(this.appointment_time?.form?.value?.appointment_time?.hour) && isNaN(this.appointment_time?.form?.value?.appointment_time?.minute)) {
            return true
        }
    }
}