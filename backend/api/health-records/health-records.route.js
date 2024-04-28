const { 
  savePersonalInfo,
  saveEmergencyContact,
  saveInsuranceInfo,
  savePhysicianInfo,
  saveMedicalCondition,
  saveAllergies,
  saveMedications,
  saveVaccination,
  saveAdditionalNotes,

  editPersonalInfo,
  editEmergencyContact,
  editInsuranceInfo,
  editPhysicianInfo,
  editMedicalCondition,
  editAllergies,
  editMedications,
  editVaccination,
  editAdditionalNotes,

  getPersonalInfo,
  getEmergencyContact,
  getInsuranceInfo,
  getPhysicianInfo,
  getMedicalCondition,
  getAllergies,
  getMedications,
  getVaccination,
  getAdditionalNotes,

  requestPermission,
  updatePermission,
  getPermission,
  getRequestedPermission
} = require('./health-records.controller');

const router = require('express').Router();

// user/patient add healths records for the first time
router.post('/personalInfo/:userId', savePersonalInfo);
router.post('/emergencyContact/:userId', saveEmergencyContact);
router.post('/insuranceInfo/:userId', saveInsuranceInfo);
router.post('/physicianInfo/:userId', savePhysicianInfo);
router.post('/medicalCondition/:userId', saveMedicalCondition);
router.post('/allergies/:userId', saveAllergies);
router.post('/medications/:userId', saveMedications);
router.post('/vaccination/:userId', saveVaccination);
router.post('/additionalNotes/:userId', saveAdditionalNotes);

// user/patient edits existing health records
router.put('/personalInfo/:userId', editPersonalInfo);
router.put('/emergencyContact/:userId', editEmergencyContact);
router.put('/insuranceInfo/:userId', editInsuranceInfo);
router.put('/physicianInfo/:userId', editPhysicianInfo);
router.put('/medicalCondition/:userId', editMedicalCondition);
router.put('/allergies/:userId', editAllergies);
router.put('/medications/:userId', editMedications);
router.put('/vaccination/:userId', editVaccination);
router.put('/additionalNotes/:userId', editAdditionalNotes);

// get health records of user/patient
router.get('/personalInfo/:userId', getPersonalInfo);
router.get('/emergencyContact/:userId', getEmergencyContact);
router.get('/insuranceInfo/:userId', getInsuranceInfo);
router.get('/physicianInfo/:userId', getPhysicianInfo);
router.get('/medicalCondition/:userId', getMedicalCondition);
router.get('/allergies/:userId', getAllergies);
router.get('/medications/:userId', getMedications);
router.get('/vaccination/:userId', getVaccination);
router.get('/additionalNotes/:userId', getAdditionalNotes);

// doctor asks for permission to see user's/patient's health records
// user/patient can deny or allow
router.post('/permission/request/:doctorId', requestPermission);
router.put('/permission/update/:userId', updatePermission);
router.get('/permission/get/:doctorId', getPermission);
router.get('/permission/get/requested/:patientId', getRequestedPermission);

module.exports = router;