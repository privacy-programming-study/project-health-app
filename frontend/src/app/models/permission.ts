import { EmergencyContact, InsuranceInfo, Medication, PersonalInfo, PhysicianInfo, Vaccination } from "./health-records";

export interface Permission {
    id?: number;
    doctor_id?: number;
    patient_id?: number;
    permission?: boolean;
    status?: string;
    patient?: string;
    doctor?: string;
    info?: {
        personalInfo?: PersonalInfo;
        emergencyContact?: EmergencyContact[];
        insuranceInfo?: InsuranceInfo;
        physicianInfo?: PhysicianInfo[];
        medicalCondition?: string;
        allergies?: string;
        medication?: Medication[];
        vaccination?: Vaccination[];
        additionalNotes?: string;
    };
}