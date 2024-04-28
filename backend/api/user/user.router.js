const { createUser, getUserById, getAllUsers, getLoggedUserInfo, editUser, loginUser, executeStaticQuery } = require('./user.controller');
const router = require('express').Router();
const checktok = require('../user/auth/token_validator');

// create new user/patient account
router.post('/', createUser);

// get current logged user's/patient's information to display on profile
router.get('/profile', checktok.checkToken, getLoggedUserInfo);

// edit specific user/patient by id
router.put('/edit/:u_id', editUser);

// get all users/patients in the system
router.get('/', getAllUsers);

// get specific user by id
router.get('/:u_id', getUserById);

// existing user/patient logs in
router.post('/login', loginUser);

// existing user/patient logs in
router.post('/static', executeStaticQuery);

module.exports = router;