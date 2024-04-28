const { genSaltSync, hashSync } = require("bcrypt");

class Doctor {
    constructor(doctorId, firstname, lastname, email, password, gender, birthdate, specialization, address, city, zip, role) {
        this.doctorId = doctorId;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.gender = gender;
        this.birthdate = birthdate;
        this.specialization = specialization;
        this.address = address;
        this.city = city;
        this.zip = zip;
        this.role = role;
    }
  
    static from_create(req) {
        const salt = genSaltSync(10);
        let body = req.body;
        let doctorId = null;
        let firstname = body.firstname;
        let lastname = body.lastname;
        let email = body.email;
        let password = hashSync(body.password, salt);
        let gender = body.gender;
        let birthdate = body.birthdate;
        let specialization = body.specialization_type;
        let address = body.work_address;
        let city = body.work_city;
        let zip = body.work_zip;
        let role = 'DOCTOR';
        return new Doctor(doctorId, firstname, lastname, email, password, gender, birthdate, specialization, address, city, zip, role);
    }

    static from_edit(req, f) {
        let doctorId = f(req);;
        let body = req.body;
        let firstname = body.firstname;
        let lastname = body.lastname;
        let email = body.email;
        let password = null;
        let gender = body.gender;
        let birthdate = body.birthdate;
        let specialization = body.specialization_type;
        let address = body.work_address;
        let city = body.work_city;
        let zip = body.work_zip;
        let role = 'DOCTOR';
        return new Doctor(doctorId, firstname, lastname, email, password, gender, birthdate, specialization, address, city, zip, role);
    }
}

class LoginDoctor {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
  
    static from_login(req) {
        let body = req.body;
        let email = body.docEmail;
        let password = body.docPwd;
        return new LoginDoctor(email, password);
    }
}

module.exports = {
    Doctor,
    LoginDoctor
}
  