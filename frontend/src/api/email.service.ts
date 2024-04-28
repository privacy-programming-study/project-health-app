import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private urlEmail = "http://localhost:3000/email";

  constructor(private http: HttpClient) { }

  // user/patient or doctor forgot password => send email
  resetPassword(data: { role?: string, email?: string }):Observable<any> {
    return this.http.post(`${this.urlEmail}/reset-password`, data);
  }

  // doctor sends mail to all his patients
  doctorSendMail(data: { mailText?: string, doctorMail?: string, patientsMail?: string[], mailSubject?: string }):Observable<any> {
    return this.http.post(`${this.urlEmail}/doctor/send-mail`, data);
  }

}
