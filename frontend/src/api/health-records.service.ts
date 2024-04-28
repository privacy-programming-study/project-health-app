import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Permission } from 'src/app/models/permission';
import { AdditionalNotes, Allergies, EmergencyContact, InsuranceInfo, MedicalCondition, Medication, PersonalInfo, PhysicianInfo, Vaccination } from 'src/app/models/health-records';

@Injectable({
  providedIn: 'root'
})

export class HealthRecordsService {
    private healthRecordsUrl = "http://localhost:3000/health-records";

    constructor(private _http: HttpClient) { }

    // get all health record permission (granted and denied) related to doctor
    getPermission(doctorId: number): Observable<any> {
        return this._http.get(`${this.healthRecordsUrl}/permission/get/${doctorId}`);
    }

    // doctor sends request to a user/patient to grant him permission to see user's/patient's health records
    requestPermission(doctorId: number, data: Permission): Observable<any> {
        return this._http.post(`${this.healthRecordsUrl}/permission/request/${doctorId}`, data);
    }

    // get all requested permissions for user/patient
    getRequestedPermission(userId: number): Observable<any> {
        return this._http.get(`${this.healthRecordsUrl}/permission/get/requested/${userId}`);
      }
    
    // user/patient grants OR denies permission
    allowPermission(userId: number, permission: Permission): Observable<any> {
        return this._http.put(`${this.healthRecordsUrl}/permission/update/${userId}`, permission);
    }


    // save personal info of user/patient for the first time
    savePersonalInfo(userId: number, data: PersonalInfo): Observable<any> {
        return this._http.post(`${this.healthRecordsUrl}/personalInfo/${userId}`, data);
    }

    // save emergency contacts of user/patient for the first time
    saveEmergencyContact(userId: number, data: EmergencyContact): Observable<any> {
        return this._http.post(`${this.healthRecordsUrl}/emergencyContact/${userId}`, data);
    }

    // save insurance info of user/patient for the first time
    saveInsuranceInfo(userId: number, data: InsuranceInfo): Observable<any> {
        return this._http.post(`${this.healthRecordsUrl}/insuranceInfo/${userId}`, data);
    }

    // save physician infos of user/patient for the first time
    savePhysicianInfo(userId: number, data: PhysicianInfo): Observable<any> {
        return this._http.post(`${this.healthRecordsUrl}/physicianInfo/${userId}`, data);
    }

    // save medical condition of user/patient for the first time
    saveMedicalCondition(userId: number, data: MedicalCondition): Observable<any> {
        return this._http.post(`${this.healthRecordsUrl}/medicalCondition/${userId}`, data);
    }

    // save allergies of user/patient for the first time
    saveAllergies(userId: number, data: Allergies): Observable<any> {
        return this._http.post(`${this.healthRecordsUrl}/allergies/${userId}`, data);
    }

    // save medications of user/patient for the first time
    saveMedications(userId: number, data: Medication): Observable<any> {
        return this._http.post(`${this.healthRecordsUrl}/medications/${userId}`, data);
    }

    // save vaccinations of user/patient for the first time
    saveVaccination(userId: number, data: Vaccination): Observable<any> {
        return this._http.post(`${this.healthRecordsUrl}/vaccination/${userId}`, data);
    }

    // save additional notes of user/patient for the first time
    saveAdditionalNotes(userId: number, data: AdditionalNotes): Observable<any> {
        return this._http.post(`${this.healthRecordsUrl}/additionalNotes/${userId}`, data);
    }


    // edit personal info of user/patient
    editPersonalInfo(userId: number, data: PersonalInfo): Observable<any> {
        return this._http.put(`${this.healthRecordsUrl}/personalInfo/${userId}`, data);
    }

    // edit emergency contacts of user/patient
    editEmergencyContact(userId: number, data: EmergencyContact): Observable<any> {
        return this._http.put(`${this.healthRecordsUrl}/emergencyContact/${userId}`, data);
    }

    // edit insurance info of user/patient
    editInsuranceInfo(userId: number, data: InsuranceInfo): Observable<any> {
        return this._http.put(`${this.healthRecordsUrl}/insuranceInfo/${userId}`, data);
    }

    // edit physician infos of user/patient
    editPhysicianInfo(userId: number, data: PhysicianInfo): Observable<any> {
        return this._http.put(`${this.healthRecordsUrl}/physicianInfo/${userId}`, data);
    }

    // edit medical condition of user/patient
    editMedicalCondition(userId: number, data: MedicalCondition): Observable<any> {
        return this._http.put(`${this.healthRecordsUrl}/medicalCondition/${userId}`, data);
    }

    // edit allergies of user/patient
    editAllergies(userId: number, data: Allergies): Observable<any> {
        return this._http.put(`${this.healthRecordsUrl}/allergies/${userId}`, data);
    }

    // edit medications of user/patient
    editMedications(userId: number, data: Medication): Observable<any> {
        return this._http.put(`${this.healthRecordsUrl}/medications/${userId}`, data);
    }

    // edit vaccination of user/patient
    editVaccination(userId: number, data: Vaccination): Observable<any> {
        return this._http.put(`${this.healthRecordsUrl}/vaccination/${userId}`, data);
    }

    // edit additional notes of user/patient
    editAdditionalNotes(userId: number, data: AdditionalNotes): Observable<any> {
        return this._http.put(`${this.healthRecordsUrl}/additionalNotes/${userId}`, data);
    }


    // get personal info of user/patient by id
    getPersonalInfo(patientId: number): Observable<any> {
        return this._http.get(`${this.healthRecordsUrl}/personalInfo/${patientId}`);
    }

    // get emergency contacts of user/patient by id
    getEmergencyContact(patientId: number): Observable<any> {
        return this._http.get(`${this.healthRecordsUrl}/emergencyContact/${patientId}`);
    }

    // get insurance info of user/patient by id
    getInsuranceInfo(patientId: number): Observable<any> {
        return this._http.get(`${this.healthRecordsUrl}/insuranceInfo/${patientId}`);
    }

    // get physician infos of user/patient by id
    getPhysicianInfo(patientId: number): Observable<any> {
        return this._http.get(`${this.healthRecordsUrl}/physicianInfo/${patientId}`);
    }

    // get medical condition of user/patient by id
    getMedicalCondition(patientId: number): Observable<any> {
        return this._http.get(`${this.healthRecordsUrl}/medicalCondition/${patientId}`);
    }

    // get allergies of user/patient by id
    getAllergies(patientId: number): Observable<any> {
        return this._http.get(`${this.healthRecordsUrl}/allergies/${patientId}`);
    }

    // get medications of user/patient by id
    getMedications(patientId: number): Observable<any> {
        return this._http.get(`${this.healthRecordsUrl}/medications/${patientId}`);
    }

    // get vaccinations of user/patient by id
    getVaccination(patientId: number): Observable<any> {
        return this._http.get(`${this.healthRecordsUrl}/vaccination/${patientId}`);
    }

    // get additional notes of user/patient by id
    getAdditionalNotes(patientId: number): Observable<any> {
        return this._http.get(`${this.healthRecordsUrl}/additionalNotes/${patientId}`);
    }

}
