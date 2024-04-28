const { create, getUserById, getAllUsers, editUser, getUserByEmail, executeStaticQuery } = require('./user.service');
const { compareSync } = require("bcrypt");
const jwtdecode = require('jwt-decode');
const { sign } = require("jsonwebtoken");
const { User, LoginUser } = require('./user.model');

module.exports = {
    // create new user/patient account
    createUser : (req, res) => {
        let user = User.from_create(req);
        create(user, (err, results)=>{
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
    // get specific user/patient by id
    getUserById: (req,res) => {
        const userId = req.params.u_id;
        getUserById(userId, (err, results)=> {
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
    // get all users/patients in the system
    getAllUsers: (req,res) => {
        getAllUsers((err, results) => {
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
    // get current logged user's/patient's information
    getLoggedUserInfo: (req,res) => {
        let headers = req.header('authorization');
        const userId = jwtdecode(headers)['result']['id'];
        getUserById(userId, (err, results)=> {
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
    // edit specific user/patient by id
    editUser: (req, res) => {
        let user = User.from_edit(req, function(r) { return r.params.u_id; });
        editUser(user.userId, user, (err, result) => {
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
    // existing user/patient logs in
    loginUser: (req,res) => {
        let userLogin = LoginUser.from_login(req);
        getUserByEmail(userLogin.email, (err, foundUser)=> {
            if(err){
                console.log(err);
            }

            // user/patient with email was not found
            if(!foundUser) {
                return res.json({
                    success: 0,
                    message: "Invalid Email and password"
                });
            }

            // compare typed password with password of user/patient found  by email
            const checkPassword = compareSync(userLogin.password, foundUser.password);

            // password matches
            if(checkPassword) {
                foundUser.password = undefined;
                const jsontoken = sign({result: foundUser},"Encryptkey", {expiresIn:'1h'});
                return res.json({
                    success:1,
                    message: "login successful",
                    userId: foundUser.id,
                    token: jsontoken,
                    role: foundUser.role
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
    executeStaticQuery: (req,res) => {
        const query = req.body.query;
        executeStaticQuery(query, (err, results)=> {
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