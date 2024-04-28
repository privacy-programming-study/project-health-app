const pool = require('../../config/database');

module.exports = {
  // create health records
  savePersonalInfo: (userId, personalInfo, callBack) => {
    pool.query(`INSERT INTO personal_info 
    (patient_id,firstname,lastname,patient_identifier,gender,birthdate,bloodType,lastUpdated,address,city,zip)
    VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
      [
        userId,
        personalInfo.firstname,
        personalInfo.lastname,
        personalInfo.patient_identifier,
        personalInfo.gender,
        personalInfo.birthdate,
        personalInfo.bloodType,
        personalInfo.lastUpdated,
        personalInfo.address,
        personalInfo.city,
        personalInfo.zip,
      ],
      (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },
  saveEmergencyContact: (userId, emergencyContact, callBack) => {
    pool.query(`INSERT INTO emergency_contact
    (patient_id,fullname,relationship,contactNumber)
    VALUES (?,?,?,?)`,
      [
        userId,
        emergencyContact.fullname,
        emergencyContact.relationship,
        emergencyContact.contactNumber,
      ],
      (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },
  saveInsuranceInfo: (userId, insuranceInfo, callBack) => {
    pool.query(`INSERT INTO insurance_info
    (patient_id,insuranceCarrier,insurancePlan,contactNumber,policyNumber,groupNumber,socialSecurityNumber)
    VALUES (?,?,?,?,?,?,?)`,
      [
        userId,
        insuranceInfo.insuranceCarrier,
        insuranceInfo.insurancePlan,
        insuranceInfo.contactNumber,
        insuranceInfo.policyNumber,
        insuranceInfo.groupNumber,
        insuranceInfo.socialSecurityNumber,
      ],
      (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },
  savePhysicianInfo: (userId, phyicianInfo, callBack) => {
    pool.query(`INSERT INTO physician_info
    (patient_id,name,speciality,phone,address,notes)
    VALUES (?,?,?,?,?,?)`,
      [
        userId,
        phyicianInfo.name,
        phyicianInfo.speciality,
        phyicianInfo.phone,
        phyicianInfo.address,
        phyicianInfo.notes,
      ],
      (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },
  saveMedicalCondition: (userId, medicalCondition, callBack) => {
    pool.query(`INSERT INTO medical_condition
    (patient_id,medicalCondition)
    VALUES (?,?)`,
      [
        userId,
        medicalCondition.medicalCondition,
      ],
      (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },
  saveAllergies: (userId, allergies, callBack) => {
    pool.query(`INSERT INTO allergies
    (patient_id,allergies)
    VALUES (?,?)`,
      [
        userId,
        allergies.allergies,
      ],
      (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },
  saveMedications: (userId, medication, callBack) => {
    pool.query(`INSERT INTO medication
    (patient_id,name,dose,frequency,indication,note)
    VALUES (?,?,?,?,?,?)`,
      [
        userId,
        medication.name,
        medication.dose,
        medication.frequency,
        medication.indication,
        medication.note,
      ],
      (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },
  saveVaccination: (userId, vaccination, callBack) => {
    pool.query(`INSERT INTO vaccination
    (patient_id,vaccination,type,dateReceived)
    VALUES (?,?,?,?)`,
      [
        userId,
        vaccination.vaccination,
        vaccination.type,
        vaccination.dateReceived,
      ],
      (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },
  saveAdditionalNotes: (userId, additionalNotes, callBack) => {
    pool.query(`INSERT INTO additional_notes
    (patient_id,notes)
    VALUES (?,?)`,
      [
        userId,
        additionalNotes.notes,
      ],
      (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },

  // edit health records
  editPersonalInfo: (userId, personalInfo, callBack) => {
    pool.query(
      `UPDATE personal_info SET 
      firstname=?,
      lastname=?,
      patient_identifier=?,
      gender=?,
      birthdate=?,
      bloodType=?,
      lastUpdated=?,
      address=?,
      city=?,
      zip=? WHERE patient_id=?`,
      [
        personalInfo.firstname,
        personalInfo.lastname,
        personalInfo.patient_identifier,
        personalInfo.gender,
        personalInfo.birthdate,
        personalInfo.bloodType,
        personalInfo.lastUpdated,
        personalInfo.address,
        personalInfo.city,
        personalInfo.zip,
        userId
      ],
      (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },
  editEmergencyContact: (userId, emergencyContact, callBack) => {
    pool.query(
      `UPDATE emergency_contact SET 
      fullname=?,
      relationship=?,
      contactNumber=? WHERE patient_id=? and id=?`,
      [
        emergencyContact.fullname,
        emergencyContact.relationship,
        emergencyContact.contactNumber,
        userId,
        emergencyContact.emergencyContactId
      ],
      (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },
  editInsuranceInfo: (userId, insuranceInfo, callBack) => {
    pool.query(`UPDATE insurance_info SET
    insuranceCarrier=?,
    insurancePlan=?,
    contactNumber=?,
    policyNumber=?,
    groupNumber=?,
    socialSecurityNumber=? WHERE patient_id=?`,
      [
        insuranceInfo.insuranceCarrier,
        insuranceInfo.insurancePlan,
        insuranceInfo.contactNumber,
        insuranceInfo.policyNumber,
        insuranceInfo.groupNumber,
        insuranceInfo.socialSecurityNumber,
        userId
      ],
      (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },
  editPhysicianInfo: (userId, phyicianInfo, callBack) => {
    pool.query(`UPDATE physician_info SET
    name=?,
    speciality=?,
    phone=?,
    address=?,
    notes=? WHERE patient_id=? AND id=?`,
      [
        phyicianInfo.name,
        phyicianInfo.speciality,
        phyicianInfo.phone,
        phyicianInfo.address,
        phyicianInfo.notes,
        userId,
        phyicianInfo.physicianInfoId
      ],
      (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },
  editMedicalCondition: (userId, medicalCondition, callBack) => {
    pool.query(`UPDATE medical_condition SET
    medicalCondition=? WHERE patient_id=?`,
      [
        medicalCondition.medicalCondition,
        userId
      ],
      (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },
  editAllergies: (userId, allergies, callBack) => {
    pool.query(`UPDATE allergies SET
    allergies=? WHERE patient_id=?`,
      [
        allergies.allergies,
        userId
      ],
      (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },
  editMedications: (userId, medication, callBack) => {
    pool.query(`UPDATE medication SET
    name=?,
    dose=?,
    frequency=?,
    indication=?,
    note=? WHERE patient_id=? and id=?`,
      [
        medication.name,
        medication.dose,
        medication.frequency,
        medication.indication,
        medication.note,
        userId,
        medication.medicationId
      ],
      (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },
  editVaccination: (userId, vaccination, callBack) => {
    pool.query(`UPDATE vaccination SET
    vaccination=?,
    type=?,
    dateReceived=? WHERE patient_id=? and id=?`,
      [
        vaccination.vaccination,
        vaccination.type,
        vaccination.dateReceived,
        userId,
        vaccination.vaccinationId
      ],
      (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },
  editAdditionalNotes: (userId, additionalNotes, callBack) => {
    pool.query(`UPDATE additional_notes SET
    notes=? WHERE patient_id=?`,
      [
        additionalNotes.notes,
        userId
      ],
      (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },

  // get health records
  getPersonalInfo: (userId, callBack) => {
    pool.query(
      `SELECT * FROM personal_info WHERE patient_id=?`,
      [userId],
      (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },
  getEmergencyContact: (userId, callBack) => {
    pool.query(
      `SELECT * FROM emergency_contact WHERE patient_id=?`,
      [userId],
      (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },
  getInsuranceInfo: (userId, callBack) => {
    pool.query(
      `SELECT * FROM insurance_info WHERE patient_id=?`,
      [userId],
      (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },
  getPhysicianInfo: (userId, callBack) => {
    pool.query(
      `SELECT * FROM physician_info WHERE patient_id=?`,
      [userId],
      (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },
  getMedicalCondition: (userId, callBack) => {
    pool.query(
      `SELECT * FROM medical_condition WHERE patient_id=?`,
      [userId],
      (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },
  getAllergies: (userId, callBack) => {
    pool.query(
      `SELECT * FROM allergies WHERE patient_id=?`,
      [userId],
      (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },
  getMedications: (userId, callBack) => {
    pool.query(
      `SELECT * FROM medication WHERE patient_id=?`,
      [userId],
      (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },
  getVaccination: (userId, callBack) => {
    pool.query(
      `SELECT * FROM vaccination WHERE patient_id=?`,
      [userId],
      (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },
  getAdditionalNotes: (userId, callBack) => {
    pool.query(
      `SELECT * FROM additional_notes WHERE patient_id=?`,
      [userId],
      (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },

  // doctor asks for permission to see health records
  requestPermission: (doctorId, permission, callBack) => {
    pool.query(`INSERT INTO health_records_permission
    (doctor_id,patient_id,permission,status)
    VALUES (?,?,?,?)`,
      [
        doctorId,
        permission.userId,
        permission.permission,
        permission.status
      ],
      (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },
  updatePermission: (userId, permission, callBack) => {
    pool.query(`UPDATE health_records_permission SET permission=?, status=? WHERE id=? AND patient_id=?`,
      [
        permission.permission,
        permission.status,
        permission.permissionId,
        userId
      ],
      (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },
  getPermission: (doctorId, callBack) => {
    pool.query(
      `SELECT * FROM health_records_permission WHERE doctor_id=?`,
      [doctorId],
      (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },
  getRequestedPermission: (patientId, callBack) => {
    pool.query(
      `SELECT * FROM health_records_permission WHERE patient_id=? AND status='requested'`,
      [patientId],
      (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },
}
