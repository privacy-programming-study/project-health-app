const {
    makeAppointment,
    makeAppointmentDoctor,
    getUserAppointmentsAll,
    getDoctorAppointmentsAll,
    cancelDoctorAppointment,
    cancelAppointment,
    declineAppointment,
    acceptAppointment,
    deleteAppointment
} = require('./appointment.service');
const {
  Appointment
} = require('./appointment.model');

module.exports = {
    // user makes/requests an appointment
    makeAppointment : (req, res) => {
        let appointment = Appointment.from_request(req, function(r) { return r.params.userId; });
        makeAppointment(appointment.userId, appointment, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    // doctor adds an appointment by using the calendar
    makeAppointmentDoctor : (req, res) => {
        let appointment = Appointment.from_made_by_doctor(req, function(r) { return r.params.doctorId; });
        makeAppointmentDoctor(appointment.doctor_id, appointment, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    // get user's declined appointments
    getUserAppointmentsAll: (req,res) => {
        const userId = req.params.userId;
        getUserAppointmentsAll(userId, (err, results)=> {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: 'Record not found'
                });
            }
            return res.json({
                success : 1,
                data: results
            });
        });
    },
    // get all doctor's appointments
    getDoctorAppointmentsAll: (req,res) => {
        const doctorId = req.params.doctorId;
        getDoctorAppointmentsAll(doctorId, (err, results)=> {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: 'Record not found'
                });
            }
            return res.json({
                success : 1,
                data: results
            });
        });
    },
    // patient cancels appointment
    // appointment date > today
    // appointment status = 'accepted'
    cancelAppointment: (req,res) => {
        let appointment = Appointment.from_update_status(req);
        cancelAppointment(appointment.userId, appointment.appointmentId, (err, results) => {
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                data:results
            });
        });
    },
    // doctor cancels appointment
    // appointment date > today
    // appointment status = 'accepted'
    cancelDoctorAppointment: (req,res) => {
        let appointment = Appointment.from_update_status(req);
        cancelDoctorAppointment(appointment.doctor_id, appointment.appointmentId, (err, results) => {
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                data:results
            });
        });
    },
    // doctor declines requested appointment
    declineAppointment: (req,res) => {
        let appointment = Appointment.from_update_status(req);
        declineAppointment(appointment.doctor_id, appointment.appointmentId, (err, results) => {
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                data:results
            });
        });
    },
    // doctor accepts requested appointment
    acceptAppointment: (req,res) => {
        let appointment = Appointment.from_update_status(req);
        acceptAppointment(appointment.doctor_id, appointment.appointmentId, (err, results) => {
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                data:results
            });
        });
    },
    // user/patient deletes appointment to remove from overview in dashboard
    // appointment status = 'requested' OR 'declined'
    deleteAppointment: (req,res) => {
        const appointmentId = req.params.appointmentId;
        deleteAppointment(appointmentId, (err, results) => {
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                data:results
            });
        });
    }
};
