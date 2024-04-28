import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'appointment-info',
    templateUrl: './appointment-info.component.html',
    styleUrls: ['./appointment-info.component.scss']
})
export class AppointmentInfoComponent implements OnInit {
    patient: string;
    date: string;
    time: string;
    reason: string;
    doctorId = JSON.parse(localStorage.getItem("DoctorData"))['docId'];

    constructor(
        private dialogRef: MatDialogRef<AppointmentInfoComponent>,
        @Inject(MAT_DIALOG_DATA) data) {

        this.date = data.date;
        this.patient = data.patient;
        this.time = data.time;
        this.reason = data.reason;
    }

    ngOnInit() { }

    close() {
        this.dialogRef.close();
    }
}