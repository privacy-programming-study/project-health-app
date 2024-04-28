const { createDoctor, getLoggedDoctorInfo, getAllDoctors, getDoctorById, editDoctor, loginDoctor, getPatientsMail } = require('./doctor.controller');
const checkTok = require('../doctor/auth/token_validator');
const router = require('express').Router();

// create new doctor account
router.post('/', createDoctor);

// get current logged doctor's information to display on profile
router.get('/profile', checkTok.checkToken, getLoggedDoctorInfo)

// edit specific doctor by id
router.put('/edit/:doctorId', editDoctor);

// get specific doctor by id
router.get('/:doctorId', getDoctorById);

// get all doctors in the system
router.get('/', getAllDoctors)

// existing doctor logs in
router.post('/login',loginDoctor);

// get doctor's patients
router.get('/patientsMail/:doctorId',getPatientsMail);

module.exports = router;