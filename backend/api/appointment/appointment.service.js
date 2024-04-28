const pool = require('../../config/database');

module.exports = {
  makeAppointment: (userId, appointment, callBack) => {
    pool.query(`INSERT INTO appointments 
    (user_patient_id,appointment_date,appointment_time,appointment_doctor_type,appointment_doctor_id,appointment_reason,appointment_status,patient_name)
    VALUES (?,?,?,?,?,?,?,?)`,
      [
        userId,
        appointment.date,
        appointment.time,
        appointment.doctor_type,
        appointment.doctor_id,
        appointment.reason,
        appointment.status,
        appointment.patient_name
      ],
      (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },
  makeAppointmentDoctor: (doctorId, appointment, callBack) => {
    pool.query(`INSERT INTO appointments 
    (user_patient_id,appointment_date,appointment_time,appointment_doctor_type,appointment_doctor_id,appointment_reason,appointment_status,patient_name)
    VALUES (?,?,?,?,?,?,?,?)`,
      [
        appointment.userId,
        appointment.date,
        appointment.time,
        appointment.doctor_type,
        doctorId,
        appointment.reason,
        appointment.status,
        appointment.patient_name
      ],
      (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },
  getUserAppointmentsAll: (userId, callBack) => {
    pool.query(
      `SELECT * FROM appointments WHERE user_patient_id=?`,
      [userId],
      (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },
  getDoctorAppointmentsAll: (doctorId, callBack) => {
    pool.query(
      `SELECT * FROM appointments WHERE appointment_doctor_id=?`,
      [doctorId],
      (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },
  cancelAppointment: (userId, appointmentId, callBack) => {
    pool.query(
      `UPDATE appointments SET appointment_status="canceled" WHERE id=? and user_patient_id=?`,
      [
        appointmentId,
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
  cancelDoctorAppointment: (doctorId, appointmentId, callBack) => {
    pool.query(
      `UPDATE appointments SET appointment_status="canceled" WHERE id=? and appointment_doctor_id=?`,
      [
        appointmentId,
        doctorId
      ],
      (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },
  declineAppointment: (doctorId, appointmentId, callBack) => {
    pool.query(
      `UPDATE appointments SET appointment_status="declined" WHERE id=? and appointment_doctor_id=?`,
      [
        appointmentId,
        doctorId
      ],
      (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },
  acceptAppointment: (doctorId, appointmentId, callBack) => {
    pool.query(
      `UPDATE appointments SET appointment_status="accepted" WHERE id=? and appointment_doctor_id=?`,
      [
        appointmentId,
        doctorId
      ],
      (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },
  deleteAppointment: (appointmentId, callBack) => {
    pool.query(
      `DELETE FROM appointments WHERE (appointment_status="declined" or appointment_status="requested") and id=?`,
      [
        appointmentId
      ],
      (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
      }
    )
  }
}
