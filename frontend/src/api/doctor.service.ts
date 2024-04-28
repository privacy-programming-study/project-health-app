import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Doctor, LoginDoctor } from 'src/app/models/doctor';

@Injectable({
  providedIn: 'root'
})

export class DoctorService {
    private doctorUrl = 'http://localhost:3000/doctor';

    private doctorToken = localStorage.getItem("DoctorData");
    httpOptionsWithToken: { header: HttpHeaders } = {
        header: new HttpHeaders().set("Authorization",this.doctorToken)
    };

    httpOptions : { headers: HttpHeaders } = {
        headers : new HttpHeaders({"Content-Type": "application/json"}),
    };

    private _docIsAuthenticated = false;

    constructor(private _http: HttpClient, private route: Router, private alertController: AlertController) { }

    // create new doctor account
    createDoctor(data: Doctor): Observable<any> {
        return this._http.post(`${this.doctorUrl}`, data).pipe(catchError(this.handleError));
    }

    // get all doctors in the system
    getDoctorsAll(): Observable<any> {
        return this._http.get(`${this.doctorUrl}`);
    }

    // get doctor by token
    getDoctorByToken(): Observable<any> {
        return this._http.get(`${this.doctorUrl}/profile`,{ headers: this.httpOptionsWithToken.header });
    }

    // get doctor by id
    getDoctorById(doctorId: number): Observable<any> {
        return this._http.get(`${this.doctorUrl}/${doctorId}`);
    }

    // edit doctor with given id
    editDoctor(doctorId: number, data: Doctor){
        return this._http.put(`${this.doctorUrl}/edit/${doctorId}`, data);
    }

    // get doctor by id
    getPatientsMail(doctorId: number): Observable<any> {
        return this._http.get(`${this.doctorUrl}/patientsMail/${doctorId}`);
    }

    // doctor logs in
    onLogin(loginData: LoginDoctor): Observable<any> {
        return this._http.post(`${this.doctorUrl}/login`, loginData, this.httpOptions).pipe(
          tap(resData => {
            if(resData['success'] != 0) // valid credentials
            {
                this._docIsAuthenticated = true;
                localStorage.setItem("DoctorData", JSON.stringify(resData));
                this.doctorToken = localStorage.getItem("DoctorData");
                this.httpOptionsWithToken = {
                    header: new HttpHeaders().set("Authorization",this.doctorToken)
                };
                this.route.navigateByUrl('doctor/dashboard');
            }
            else { // invalid credentials
              this.presentInvalidCred();
            }
          })
        );
    }

    // doctor logs out
    onLogout() {
        localStorage.removeItem("DoctorData");
        this._docIsAuthenticated = false;
        this.route.navigateByUrl('/login/doctor').then(() => {
          window.location.reload();
        });
    }

    get docIsAuthenticated(){
        return this._docIsAuthenticated;
    }
    
    // present alert if email or password invalid
    async presentInvalidCred() {
        const alert = await this.alertController.create({
            message: 'Invalid Email and password',
            buttons: ['OK']
        });
        await alert.present();
    }

    handleError(error){
        return throwError(error.message || "Server Error")
    }

}
