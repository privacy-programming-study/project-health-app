class PersonalInfo {
    constructor(personalInfoId, userId, firstname, lastname, patient_identifier, gender, birthdate, bloodType, lastUpdated, address, city, zip) {
        this.personalInfoId = personalInfoId;
        this.userId = userId;
        this.firstname = firstname;
        this.lastname = lastname;
        this.patient_identifier = patient_identifier;
        this.gender = gender;
        this.birthdate = birthdate;
        this.bloodType = bloodType;
        this.lastUpdated = lastUpdated;
        this.address = address;
        this.city = city;
        this.zip = zip;
    }
  
    static from_create_edit(req, f) {
        let body = req.body;
        let personalInfoId = body.id;
        let userId = f(req);
        let firstname = body.firstname;
        let lastname = body.lastname;
        let patient_identifier = body.patient_identifier;
        let gender = body.gender;
        let birthdate = body.birthdate;
        let bloodType = body.bloodType;
        let lastUpdated = body.lastUpdated;
        let address = body.address;
        let city = body.city;
        let zip = body.zip;
        return new PersonalInfo(personalInfoId, userId, firstname, lastname, patient_identifier, gender, birthdate, bloodType, lastUpdated, address, city, zip);
    }
}

class EmergencyContact {
    constructor(emergencyContactId, userId, fullname, relationship, contactNumber) {
        this.emergencyContactId = emergencyContactId;
        this.userId = userId;
        this.fullname = fullname;
        this.relationship = relationship;
        this.contactNumber = contactNumber;
    }
  
    static from_create_edit(req, f) {
        let body = req.body;
        let emergencyContactId = body.id;
        let userId = f(req);
        let fullname = body.fullname;
        let relationship = body.relationship;
        let contactNumber = body.contactNumber;
        return new EmergencyContact(emergencyContactId, userId, fullname, relationship, contactNumber);
    }
}

class InsuranceInfo {
    constructor(insuranceInfoId, userId, insuranceCarrier, insurancePlan, contactNumber, policyNumber, groupNumber, socialSecurityNumber) {
        this.insuranceInfoId = insuranceInfoId;
        this.userId = userId;
        this.insuranceCarrier = insuranceCarrier;
        this.insurancePlan = insurancePlan;
        this.contactNumber = contactNumber;
        this.policyNumber = policyNumber;
        this.groupNumber = groupNumber;
        this.socialSecurityNumber = socialSecurityNumber;
    }
  
    static from_create_edit(req, f) {
        let body = req.body;
        let userId = f(req);
        let insuranceInfoId = body.id;
        let insuranceCarrier = body.insuranceCarrier;
        let insurancePlan = body.insurancePlan;
        let contactNumber = body.contactNumber;
        let policyNumber = body.policyNumber;
        let groupNumber = body.groupNumber;
        let socialSecurityNumber = body.socialSecurityNumber;
        return new InsuranceInfo(insuranceInfoId, userId, insuranceCarrier, insurancePlan, contactNumber, policyNumber, groupNumber, socialSecurityNumber);
    }
}

class PhysicianInfo {
    constructor(physicianInfoId, userId, name, speciality, phone, address, notes) {
        this.physicianInfoId = physicianInfoId;
        this.userId = userId;
        this.name = name;
        this.speciality = speciality;
        this.phone = phone;
        this.address = address;
        this.notes = notes;
    }
  
    static from_create_edit(req, f) {
        let body = req.body;
        let userId = f(req);
        let physicianInfoId = body.id;
        let name = body.name;
        let speciality = body.speciality;
        let phone = body.phone;
        let address = body.address;
        let notes = body.notes;
        return new PhysicianInfo(physicianInfoId, userId, name, speciality, phone, address, notes);
    }
}

class MedicalCondition {
    constructor(medicalConditionId, userId, medicalCondition) {
        this.medicalConditionId = medicalConditionId;
        this.userId = userId;
        this.medicalCondition = medicalCondition;
    }
  
    static from_create_edit(req, f) {
        let body = req.body;
        let userId = f(req);
        let medicalConditionId = body.id;
        let medicalCondition = body.medicalCondition;
        return new MedicalCondition(medicalConditionId, userId, medicalCondition);
    }
}

class Allergies {
    constructor(allergiesId, userId, allergies) {
        this.allergiesId = allergiesId;
        this.userId = userId;
        this.allergies = allergies;
    }
  
    static from_create_edit(req, f) {
        let body = req.body;
        let userId = f(req);
        let allergiesId = body.id;
        let allergies = body.allergies;
        return new Allergies(allergiesId, userId, allergies);
    }
}

class Medication {
    constructor(medicationId, userId, name, dose, frequency, indication, note) {
        this.medicationId = medicationId;
        this.userId = userId;
        this.name = name;
        this.dose = dose;
        this.frequency = frequency;
        this.indication = indication;
        this.note = note;
    }
  
    static from_create_edit(req, f) {
        let body = req.body;
        let userId = f(req);
        let medicationId = body.id;
        let name = body.name;
        let dose = body.dose;
        let frequency = body.frequency;
        let indication = body.indication;
        let note = body.note;
        return new Medication(medicationId, userId, name, dose, frequency, indication, note);
    }
}

class Vaccination {
    constructor(vaccinationId, userId, vaccination, type, dateReceived) {
        this.vaccinationId = vaccinationId;
        this.userId = userId;
        this.vaccination = vaccination;
        this.type = type;
        this.dateReceived = dateReceived;
    }
  
    static from_create_edit(req, f) {
        let body = req.body;
        let userId = f(req);
        let vaccinationId = body.id;
        let vaccination = body.vaccination;
        let type = body.type;
        let dateReceived = body.dateReceived;
        return new Vaccination(vaccinationId, userId, vaccination, type, dateReceived);
    }
}

class AdditionalNotes {
    constructor(additionalNotesId, userId, notes) {
        this.additionalNotesId = additionalNotesId;
        this.userId = userId;
        this.notes = notes;
    }
  
    static from_create_edit(req, f) {
        let body = req.body;
        let userId = f(req);
        let additionalNotesId = body.id;
        let notes = body.notes;
        return new AdditionalNotes(additionalNotesId, userId, notes);
    }
}

class Permission {
    constructor(permissionId, userId, doctorId, permission, status) {
        this.permissionId = permissionId;
        this.userId = userId;
        this.doctorId = doctorId;
        this.permission = permission;
        this.status = status;
    }

    static from_request(req, f) {
        let body = req.body;
        let userId = body.patient_id;
        let doctorId = f(req);
        let permissionId = null;
        let permission = body.permission;
        let status = body.status;
        return new Permission(permissionId, userId, doctorId, permission, status);
    }
  
    static from_update(req, f) {
        let body = req.body;
        let userId = f(req);
        let doctorId = null;
        let permissionId = body.id;
        let permission = body.permission;
        let status = body.status;
        return new Permission(permissionId, userId, doctorId, permission, status);
    }
}

module.exports = {
    PersonalInfo,
    EmergencyContact,
    InsuranceInfo,
    PhysicianInfo,
    MedicalCondition,
    Allergies,
    Medication,
    Vaccination,
    AdditionalNotes,
    Permission
}