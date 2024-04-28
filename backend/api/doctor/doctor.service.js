const pool = require('../../config/database');

module.exports = {
    // create new doctor account
    createDoctor: (data, callBack)=>{
        pool.query(
            `INSERT INTO user_doctor (firstname, lastname, email, password, gender, birthdate, work_address, work_city, work_zip, specialization_type, role)
            VALUES (?,?,?,?,?,?,?,?,?,?,?)`, 
            [
                data.firstname,
                data.lastname,
                data.email,
                data.password,
                data.gender,
                data.birthdate,
                data.address,
                data.city,
                data.zip,
                data.specialization,
                data.role
            ],
        (error, results, fields) => {
            if(error){
               return callBack(error);
            }
            return callBack(null, results);
        }
        );
    },
    // get specific doctor by id
    getDoctorById: (doctorId, callBack) =>{
        pool.query(
            `SELECT * FROM user_doctor WHERE id = ?`,
            [doctorId],
            (error, results, fields) => {
                if(error){
                   return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    // get all doctors in the system
    getAllDoctors: (callBack) =>{
        pool.query(
            `SELECT * FROM user_doctor`,
            [],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    // edit specific doctor by id
    editDoctor: (doctorId, data, callBack)=>{
        pool.query(
            `UPDATE user_doctor SET 
            firstname = ?,
            lastname = ?,
            email = ?, 
            gender = ?, 
            birthdate = ?, 
            work_address = ?, 
            work_city = ?, 
            work_zip = ?, 
            specialization_type = ?
            WHERE id = ?`, 
            [
                data.firstname,
                data.lastname,
                data.email,
                data.gender,
                data.birthdate,
                data.address,
                data.city,
                data.zip,
                data.specialization,
                doctorId
            ],
        (error, results, fields) => {
            if(error){
               return callBack(error);
            }
            return callBack(null, results[0]);
        }
        );
    },
    // get doctor by email for login process
    getDocByEmail: (email, callBack) =>{
        pool.query(
            `SELECT * FROM user_doctor WHERE email = ?`,
            [email],
            (error,results, fields) =>{
                if(error){
                   return callBack(error);
                }
               
                return callBack(null, results[0]);
            }
        );
    },
    // get doctor's patients
    getPatientsMail: (doctorId, callBack) =>{
        pool.query(
            `SELECT DISTINCT up.email FROM user_patient up JOIN appointments a ON up.id = a.user_patient_id WHERE a.appointment_doctor_id = ?`,
            [doctorId],
            (error, results, fields) => {
                if(error){
                   return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
}; 