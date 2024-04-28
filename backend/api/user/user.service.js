const pool = require('../../config/database');

module.exports = {
    // create new user/patient account
    create: (data, callBack)=>{
        pool.query(
            `INSERT INTO user_patient (firstname, lastname, email, password, gender, birthdate, address, city, zip, insurance_type, role)
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
                data.insurance_type,
                "PATIENT"
            ],
        (error, results, fields) => {
            if(error){
               return callBack(error);
            }
            return callBack(null, results);
        }
        );
    },
    // get all users/patients in the system
    getAllUsers: callBack => {
        pool.query(
            `SELECT id, firstname, lastname, email, gender, birthdate, address,
            city, zip, insurance_type, role from user_patient WHERE role !='ADMIN'`,
            [],
            (error, results, fields) => {
                if(error){
                   return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    // get specific user/patient by id
    getUserById: (u_id, callBack) =>{
     pool.query(
            `SELECT * from user_patient WHERE id = ?`,
            [u_id],
            (error, results, fields) => {
                if(error){
                   return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    // edit specific user/patient by id
    editUser: (u_id, data, callBack)=>{
        console.log(u_id, data)
        pool.query(
            `UPDATE user_patient SET 
            firstname = ?,
            lastname = ?,
            email = ?, 
            gender = ?, 
            birthdate = ?, 
            address = ?, 
            city = ?, 
            zip = ?, 
            insurance_type = ?
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
                data.insurance_type,
                u_id
            ],
        (error, results, fields) => {
            if(error){
               return callBack(error);
            }
            return callBack(null, results[0]);
        }
        );
    },
    // get user/patient by email for login process
    getUserByEmail: (email, callBack) => {
        pool.query(
            `SELECT * FROM user_patient WHERE email = ?`,
            [email],
            (error,results, fields) =>{
                if(error) {
                   return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    // function to execute static query
    executeStaticQuery: (query, callBack) => {
        pool.query(query, (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        });
    }
}; 