export interface PersonalInfo {
    id?: number;
    patient_id?: number;
    firstname?: string;
    lastname?: string;
    patient_identifier?: string;
    gender?: string;
    birthdate?: string;
    bloodType?: string;
    lastUpdated?: string;
    address?: string;
    city?: string;
    zip?: string;
}

export interface EmergencyContact {
    id?: number;
    patient_id?: number;
    fullname?: string;
    relationship?: string;
    contactNumber?: string;
}

export interface InsuranceInfo {
    id?: number;
    patient_id?: number;
    insuranceCarrier?: string;
    insurancePlan?: string;
    contactNumber?: string;
    policyNumber?: string;
    groupNumber?: string;
    socialSecurityNumber?: string;
}

export interface PhysicianInfo {
    id?: number;
    patient_id?: number;
    name?: string;
    speciality?: string;
    phone?: string;
    address?: string;
    notes?: string;
}

export interface MedicalCondition {
    id?: number;
    patient_id?: number;
    medicalCondition?: string;
}

export interface Allergies {
    id?: number;
    patient_id?: number;
    allergies?: string;
}

export interface Medication {
    id?: number;
    patient_id?: number;
    name?: string;
    dose?: string;
    frequency?: string;
    indication?: string;
    note?: string;
}

export interface Vaccination {
    id?: number;
    patient_id?: number;
    vaccination?: string;
    type?: string;
    dateReceived?: string;
}

export interface AdditionalNotes {
    id?: number;
    patient_id?: number;
    notes?: string;
}