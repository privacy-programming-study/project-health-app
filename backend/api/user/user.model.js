const { genSaltSync, hashSync } = require("bcrypt");

class User {
    constructor(userId, firstname, lastname, email, password, gender, birthdate, address, city, zip, insurance_type, role) {
        this.userId = userId;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.gender = gender;
        this.birthdate = birthdate;
        this.address = address;
        this.city = city;
        this.zip = zip;
        this.insurance_type = insurance_type;
        this.role = role;
    }
  
    static from_create(req) {
        const salt = genSaltSync(10);
        let body = req.body;
        let userId = null;
        let firstname = body.firstname;
        let lastname = body.lastname;
        let email = body.email;
        let password = hashSync(body.password, salt);
        let gender = body.gender;
        let birthdate = body.birthdate;
        let address = body.address;
        let city = body.city;
        let zip = body.zip;
        let insurance_type = body.insurance_type;
        let role = 'PATIENT';
        return new User(userId, firstname, lastname, email, password, gender, birthdate, address, city, zip, insurance_type, role);
    }

    static from_edit(req, f) {
        let userId = f(req);;
        let body = req.body;
        let firstname = body.firstname;
        let lastname = body.lastname;
        let email = body.email;
        let password = null;
        let gender = body.gender;
        let birthdate = body.birthdate;
        let address = body.address;
        let city = body.city;
        let zip = body.zip;
        let insurance_type = body.insurance_type;
        let role = 'PATIENT';
        return new User(userId, firstname, lastname, email, password, gender, birthdate, address, city, zip, insurance_type, role);
    }
}

class LoginUser {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
  
    static from_login(req) {
        let body = req.body;
        let email = body.userEmail;
        let password = body.userPwd;
        return new LoginUser(email, password);
    }
}

module.exports = {
    User,
    LoginUser
}
  