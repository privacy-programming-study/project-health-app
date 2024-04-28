const { 
  makeAppointment,
  makeAppointmentDoctor,
  getUserAppointmentsAll,
  acceptAppointment,
  getDoctorAppointmentsAll,
  cancelDoctorAppointment,
  cancelAppointment,
  declineAppointment,
  deleteAppointment } = require('./appointment.controller');

const router = require('express').Router();

// user/patient makes/requests appointment
router.post('/:userId', makeAppointment);

// doctor adds appointments by using calendar in dashboard
router.post('/doctor/:doctorId', makeAppointmentDoctor);

// get user's/patient's delined appointments
router.get('/user/all/:userId', getUserAppointmentsAll);

// user/patient cancels appointment
router.put('/cancel/:userId', cancelAppointment);

// user/patient delete appointment to remove view in dashboard
router.delete('/:appointmentId', deleteAppointment)

// get all doctor's appoinments
router.get('/doctor/all/:doctorId', getDoctorAppointmentsAll);

// doctor accepts requested appointment
router.put('/accept/:doctorId', acceptAppointment);

// doctor cancels appointment
router.put('/cancel/doctor/:doctorId', cancelDoctorAppointment);

// doctor declines requested appointment
router.put('/decline/:doctorId', declineAppointment);

module.exports = router;