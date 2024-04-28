class Appointment {
  constructor(appointmentId, userId, date, time, doctor_type, doctor_id, reason, status, patient_name) {
    this.appointmentId = appointmentId;
    this.userId = userId;
    this.date = date;
    this.time = time;
    this.doctor_type = doctor_type;
    this.doctor_id = doctor_id;
    this.reason = reason;
    this.status = status;
    this.patient_name = patient_name;
  }

  static from_request(req, f) {
    let appointmentId = null;
    let userId = f(req);
    let body = req.body;
    let date = body.appointment_date;
    let time = body.appointment_time;
    let doctor_type = body.appointment_doctor_type;
    let doctor_id = body.appointment_doctor_id;
    let reason = body.appointment_reason;
    let status = "requested";
    let patient_name = null;
    return new Appointment(appointmentId, userId, date, time, doctor_type, doctor_id, reason, status, patient_name);
  }

  static from_made_by_doctor(req, f) {
    let appointmentId = null;
    let userId = null;
    let body = req.body;
    let date = body.appointment_date;
    let time = body.appointment_time;
    let doctor_type = null;
    let doctor_id = f(req);
    let reason = body.appointment_reason;
    let status = "accepted";
    let patient_name = body.patient_name;
    return new Appointment(appointmentId, userId, date, time, doctor_type, doctor_id, reason, status, patient_name);
  }

  static from_update_status(req) {
    let body = req.body;
    let appointmentId = body.id;
    let userId = body.user_patient_id;
    let date = body.appointment_date;
    let time = body.appointment_time;
    let doctor_type = body.appointment_doctor_type;
    let doctor_id = body.appointment_doctor_id;
    let reason = body.appointment_reason;
    let status = body.appointment_status;
    let patient_name = body.patient_name;
    return new Appointment(appointmentId, userId, date, time, doctor_type, doctor_id, reason, status, patient_name);
  }
}

module.exports = {
  Appointment
}
