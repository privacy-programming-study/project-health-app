import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';

@Injectable({
  providedIn: 'root'
})

export class AppointmentService {
  private appointmentUrl = 'http://localhost:3000/appointments';

  constructor(private _http: HttpClient) { }

  // user/patient makes/requests appointment
  makeAppointment(userId: number, data: Appointment): Observable<any> {
    return this._http.post(`${this.appointmentUrl}/${userId}`, data);
  }

  // doctor creates appointment using the calendar in dashboard
  makeAppointmentDoctor(doctorId: number, data: Appointment): Observable<any> {
    return this._http.post(`${this.appointmentUrl}/doctor/${doctorId}`, data);
  }

  // get all doctor's appointments ('accepted', 'requested', 'canceled', 'declined')
  getDoctorAppointmentsAll(doctorId: number): Observable<any> {
    return this._http.get(`${this.appointmentUrl}/doctor/all/${doctorId}`);
  }

  // doctor declines requested appointment
  declineAppointment(doctorId: number, appointment: Appointment): Observable<any> {
    return this._http.put(`${this.appointmentUrl}/decline/${doctorId}`, appointment);
  }

  // doctor accepts requested appointment
  acceptAppointment(doctorId: number, appointment: Appointment): Observable<any> {
    return this._http.put(`${this.appointmentUrl}/accept/${doctorId}`, appointment);
  }

  // doctor cancels accepted appointment
  cancelDoctorAppointment(doctorId: number, appointment: Appointment): Observable<any> {
    return this._http.put(`${this.appointmentUrl}/cancel/doctor/${doctorId}`, appointment);
  }

  // get all user's/patient's appointments ('accepted', 'requested', 'canceled', 'declined')
  getUserAppointmentsAll(userId: number): Observable<any> {
    return this._http.get(`${this.appointmentUrl}/user/all/${userId}`);
  }

  // user/patient deletes requested or declined appointment, to remove from dashboard view
  deleteAppointment(appointmentId: number): Observable<any> {
    return this._http.delete(`${this.appointmentUrl}/${appointmentId}`);
  }

  // user/patient cancels accepted appointment
  cancelAppointment(userId: number, appointment: Appointment): Observable<any> {
    return this._http.put(`${this.appointmentUrl}/cancel/${userId}`, appointment);
  }

}
