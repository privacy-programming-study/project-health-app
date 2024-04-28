const { createDoctor, getDoctorById, getAllDoctors, editDoctor, getDocByEmail, getPatientsMail } = require('./doctor.service');
const { compareSync } = require("bcrypt");
const jwtdecode = require('jwt-decode');
const { sign } = require("jsonwebtoken");
const { Doctor, LoginDoctor } = require('./doctor.model');

module.exports = {
    // create new doctor account
    createDoctor : (req, res) => {
        let doctor = Doctor.from_create(req);
        createDoctor(doctor, (err, results)=>{
            if(err){
                return res.status(200).json({
                    success: 0,
                    message: err.sqlMessage,
                    errorNo: err.errno
                });
            }
            return res.status(200).json({
                success:1,
                data: results
            });
        });
    },
    // get current logged doctor's information
    getLoggedDoctorInfo: (req,res) => {
        let headers = req.header('authorization');
        const doctorId = jwtdecode(headers)['result']['id'];
        getDoctorById(doctorId, (err, results)=> {
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
    // get all doctors in the system
    getAllDoctors: (req,res) => {
        getAllDoctors((err, results)=> {
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
    // get specific doctor by id
    getDoctorById: (req,res) => {
        const doctorId = req.params.doctorId;
        getDoctorById(doctorId, (err, results)=> {
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
    // edit specific doctor by id
    editDoctor: (req, res) => {
        let doctor = Doctor.from_edit(req, function(r) { return r.params.doctorId; });
        editDoctor(doctor.doctorId, doctor, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: result
            });
        })
    },
    // existing doctor logs in
    loginDoctor: (req,res) => {
        let doctorLogin = LoginDoctor.from_login(req);
        getDocByEmail(doctorLogin.email, (err, foundDoctor)=> {
            if(err) {
                console.log(err);
            }

            // doctor with email was not found
            if(!foundDoctor) {
                return res.json({
                    success: 0,
                    message: "Invalid Email and password"
                });
            }

            // compare typed password with password of doctor found  by email
            const checkPassword = compareSync(doctorLogin.password, foundDoctor.password);

            // password matches
            if(checkPassword) {
                foundDoctor.password = undefined;
                const jsontoken = sign({result: foundDoctor}, "Encryptkey", {expiresIn: '1h'});
                return res.json({
                    success:1,
                    message: "login successful",
                    docId: foundDoctor.id,
                    token: jsontoken
                });
            }
            else {
                return res.json({
                    success:0,
                    data:"Invalid username or password"
                });
            }
        });
    },
    // existing doctor logs in
    getPatientsMail: (req,res) => {
        const doctorId = req.params.doctorId;
        getPatientsMail(doctorId, (err, results)=> {
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
    }
};