import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HealthRecordsService } from 'src/api/health-records.service';
import {
  AdditionalNotes,
  Allergies,
  EmergencyContact,
  InsuranceInfo,
  MedicalCondition,
  Medication,
  PersonalInfo,
  PhysicianInfo,
  Vaccination,
} from 'src/app/models/health-records';
import { UserService } from 'src/api/user.service';

@Component({
  selector: 'app-health-records',
  templateUrl: './health-records.page.html',
  styleUrls: ['./health-records.page.scss'],
})
export class HealthRecordsPage implements OnInit {
  @ViewChild('recordsForm', { static: true }) form: NgForm;
  personalInfoGender: string;
  today: any;
  userId: number;
  personalInfo: PersonalInfo;
  emergencyContact: EmergencyContact[] = [];
  insuranceInfo: InsuranceInfo;
  physicianInfo: PhysicianInfo[] = [];
  medicalCondition: MedicalCondition;
  medicalConditionString: string;
  allergies: Allergies;
  allergiesString: string;
  medication: Medication[] = [];
  vaccination: Vaccination[] = [];
  additionalNotes: AdditionalNotes;
  additionalNotesString: string;
  isEditMode = false;

  constructor(
    private healthRecordService: HealthRecordsService,
    private route: Router,
    private userService: UserService
  ) {}

  ionViewWillEnter() {
    this.fetchData();
  }

  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('userData'))['userId'];
  }

  fetchData() {
    this.healthRecordService.getPersonalInfo(this.userId).subscribe((res) => {
      this.personalInfo = res.data[0];
      this.form.form.patchValue({
        personalInfoGender: this.personalInfo?.gender,
      });
    });

    this.healthRecordService.getEmergencyContact(this.userId).subscribe((res) => {
      this.emergencyContact = res.data;
    });

    this.healthRecordService.getInsuranceInfo(this.userId).subscribe((res) => {
      this.insuranceInfo = res.data[0];
    });

    this.healthRecordService.getPhysicianInfo(this.userId).subscribe((res) => {
      this.physicianInfo = res.data;
    });

    this.healthRecordService.getMedicalCondition(this.userId).subscribe((res) => {
      this.medicalCondition = res.data[0];
      this.medicalConditionString = this.medicalCondition?.medicalCondition;
    });

    this.healthRecordService.getAllergies(this.userId).subscribe((res) => {
      this.allergies = res.data[0];
      this.allergiesString = this.allergies?.allergies;
    });

    this.healthRecordService.getMedications(this.userId).subscribe((res) => {
      this.medication = res.data;
    });

    this.healthRecordService.getVaccination(this.userId).subscribe((res) => {
      this.vaccination = res.data;
    });

    this.healthRecordService.getAdditionalNotes(this.userId).subscribe((res) => {
      this.additionalNotes = res.data[0];
      this.additionalNotesString = this.additionalNotes?.notes;
    });
  }

  onSave(form: NgForm) {
    this.saveOrUpdatePersonalInfo(form);

    this.saveOrUpdateEmergencyContact(form, 1);
    this.saveOrUpdateEmergencyContact(form, 2);

    this.saveOrUpdateInsuranceInfo(form);

    for (let index = 1; index <= 5; index++) {
      this.saveOrUpdatePhysicianInfo(form, index);
    }

    this.saveOrUpdateMedicalCondition_Allergies_AdditionalNotes(form);

    for (let index = 1; index <= 5; index++) {
      this.saveOrUpdateMedication(form, index);
    }

    for (let index = 1; index <= 9; index++) {
      this.saveOrUpdateVaccination(form, index);
    }

    this.onEdit();
  }

  saveOrUpdatePersonalInfo(form: NgForm) {
    const formPersonalInfo = {
      firstname: form.value.personalInfoFirstname,
      lastname: form.value.personalInfoLastname,
      patient_identifier: form.value.personalInfoIdentifier,
      gender: form.value.personalInfoGender,
      birthdate: form.value.personalInfoBirthdate,
      bloodType: form.value.personalInfoBloodType,
      lastUpdated: new Date().toDateString(),
      address: form.value.personalInfoAddress,
      city: form.value.personalInfoCity,
      zip: form.value.personalInfoZip,
      id: this.personalInfo?.id,
    };

    if (this.personalInfo?.id == undefined) {
      this.healthRecordService.savePersonalInfo(this.userId, formPersonalInfo).subscribe((res) => {});
    } else {
      this.healthRecordService.editPersonalInfo(this.userId, formPersonalInfo).subscribe((res) => { });
    }
  }

  saveOrUpdateEmergencyContact(form: NgForm, index: number) {
    const emergencyContactData = {
      fullname: form.value[`emergencyContactFullname_${index}`],
      relationship: form.value[`emergencyContactRelationship_${index}`],
      contactNumber: form.value[`emergencyContactNumber_${index}`],
      id: this.emergencyContact[index - 1]?.id,
    };

    if (this.emergencyContact[index - 1]?.id == undefined) {
      this.healthRecordService.saveEmergencyContact(this.userId, emergencyContactData).subscribe((res) => {});
    } else {
      this.healthRecordService.editEmergencyContact(this.userId, emergencyContactData).subscribe((res) => { });
    }
  }

  saveOrUpdateInsuranceInfo(form: NgForm) {
    const formInsuranceInfo = {
      insuranceCarrier: form.value.insuranceInfoCarrier,
      insurancePlan: form.value.insuranceInfoPlan,
      contactNumber: form.value.insuranceInfoContactNumber,
      policyNumber: form.value.insuranceInfoPolicyNumber,
      groupNumber: form.value.insuranceInfoGroupNumber,
      socialSecurityNumber: form.value.insuranceInfoSecurityNumber,
      id: this.insuranceInfo?.id,
    };

    if (this.insuranceInfo?.id == undefined) {
      this.healthRecordService.saveInsuranceInfo(this.userId, formInsuranceInfo).subscribe((res) => {});
    } else {
      this.healthRecordService.editInsuranceInfo(this.userId, formInsuranceInfo).subscribe((res) => { });
    }
  }

  saveOrUpdatePhysicianInfo(form: NgForm, index: number) {
    const physicianInfoData = {
      name: form.value[`physicianInfoName_${index}`],
      speciality: form.value[`physicianInfoSpeciality_${index}`],
      phone: form.value[`physicianInfoPhone_${index}`],
      address: form.value[`physicianInfoAddress_${index}`],
      notes: form.value[`physicianInfoNotes_${index}`],
      id: this.physicianInfo[index - 1]?.id,
    };

    if (this.physicianInfo[index - 1]?.id == undefined) {
      this.healthRecordService.savePhysicianInfo(this.userId, physicianInfoData).subscribe((res) => {});
    } else {
      this.healthRecordService.editPhysicianInfo(this.userId, physicianInfoData).subscribe((res) => { });
    }
  }

  saveOrUpdateMedicalCondition_Allergies_AdditionalNotes(form: NgForm) {
    const formMedicalCondition = {
      medicalCondition: form.value.medicalConditionString,
      id: this.medicalCondition?.id,
    };

    if (this.medicalCondition?.id == undefined) {
      this.healthRecordService.saveMedicalCondition(this.userId, formMedicalCondition).subscribe((res) => {});
    } else {
      this.healthRecordService.editMedicalCondition(this.userId, formMedicalCondition).subscribe((res) => { });
    }

    const formAllergies = {
      allergies: form.value.allergiesString,
      id: this.allergies?.id,
    };

    if (this.allergies?.id == undefined) {
      this.healthRecordService.saveAllergies(this.userId, formAllergies).subscribe((res) => {});
    } else {
      this.healthRecordService.editAllergies(this.userId, formAllergies).subscribe((res) => { });
    }

    const formAdditionalNotes = {
      notes: form.value.additionalNotesString,
      id: this.additionalNotes?.id,
    };

    if (this.additionalNotes?.id == undefined) {
      this.healthRecordService.saveAdditionalNotes(this.userId, formAdditionalNotes).subscribe((res) => {});
    } else {
      this.healthRecordService.editAdditionalNotes(this.userId, formAdditionalNotes).subscribe((res) => { });
    }
  }

  saveOrUpdateMedication(form: NgForm, index: number) {
    const medicationData = {
      name: form.value[`medicationName_${index}`],
      dose: form.value[`medicationDose_${index}`],
      frequency: form.value[`medicationFrequency_${index}`],
      indication: form.value[`medicationIndication_${index}`],
      note: form.value[`medicationNote_${index}`],
      id: this.medication[index - 1]?.id,
    };

    if (this.medication[index - 1]?.id == undefined) {
      this.healthRecordService.saveMedications(this.userId, medicationData).subscribe((res) => {});
    } else {
      this.healthRecordService.editMedications(this.userId, medicationData).subscribe((res) => { });
    }
  }

  saveOrUpdateVaccination(form: NgForm, index: number) {
    const vaccinationData = {
      vaccination: form.value[`vaccination_${index}`],
      type: form.value[`vaccinationType_${index}`],
      dateReceived: form.value[`vaccinationDate_${index}`],
      id: this.vaccination[index - 1]?.id,
    };

    if (this.vaccination[index - 1]?.id == undefined) {
      this.healthRecordService.saveVaccination(this.userId, vaccinationData).subscribe((res) => {});
    } else {
      this.healthRecordService.editVaccination(this.userId, vaccinationData).subscribe((res) => { });
    }
  }

  onEdit() {
    this.isEditMode = !this.isEditMode;

    // Update lastUpdated-field
    if (!this.isEditMode) {
      this.form.form.patchValue({
        personalInfoLastUpdated: new Date().toDateString(),
      });
    }
  }

  onLogout() {
    this.userService.onLogout();
  }

  onProfile() {
    this.route.navigateByUrl('/user/profile');
  }
}
