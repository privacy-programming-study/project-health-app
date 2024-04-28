import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AlertController } from '@ionic/angular';
import { DoctorService } from 'src/api/doctor.service';
import { UserService } from 'src/api/user.service';
import { BackupService } from 'src/api/backup.service';
import { SystemUser } from '../models/system-user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})

export class AdminPage implements OnInit {
    displayedColumns = ['id', 'role', 'name', 'email'];
    patientData: SystemUser[] = [];
    doctorData: SystemUser[] = [];
    dataSource: MatTableDataSource<SystemUser>;
    
    constructor(
        private doctorService: DoctorService,
        private userService: UserService,
        private backupService: BackupService,
        private alertController: AlertController
    ) {  }

    ngOnInit() {}

    onLogout(){
        this.userService.onLogout();
    }

    ionViewWillEnter () {
        this.fetchData();
    }

    fetchData() {
        // fetch patient users
        this.userService.getUsersAll().subscribe((res)=>{
            let tmpPatient = res.data;

            tmpPatient.forEach(element => {
                this.patientData.push({
                    id: element.id,
                    role: element.role,
                    name: element.firstname + ' ' + element.lastname,
                    email: element.email
                })
            });

            // fetch doctor users
            this.doctorService.getDoctorsAll().subscribe((res)=>{
                let tmpDoctor = res.data;
        
                tmpDoctor.forEach(element => {
                    this.doctorData.push({
                        id: element.id,
                        role: element.role,
                        name: element.firstname + ' ' + element.lastname,
                        email: element.email
                    })
                });
        
                this.dataSource = new MatTableDataSource([ ...this.patientData, ...this.doctorData]);
            })
        });
    }

    // create backup
    onCreateBackup() {
        this.backupService.createBackup({}).subscribe((res)=>{
            if (res.success === 0) {
                this.presentBackupError();
            }
            else if (res.success === 1){
                this.presentBackupSuccessful();
            }
        });
    }
  
    // error while creating backup
    async presentBackupError() {
        const alert = await this.alertController.create({
            message: 'Backup couldn\'t be created. Please try again!',
            buttons: ['OK']
        });
        await alert.present();
    }

    // backup was successfully created
    async presentBackupSuccessful() {
        const alert = await this.alertController.create({
            message: 'Backup was successfully created!',
            buttons: ['OK']
        });
        await alert.present();
    }
}
