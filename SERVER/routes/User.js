const express = require('express');
const router = express.Router();
const {auth} =require("../middlewares/Auth.js");

const {sendOTP,changePassword,signup,login} = require('../controllers/Auth.js');

// route for sending otp to user's mail
router.post('/sendOTP',sendOTP);

// route for changing the password
router.post('/changepassword',auth,changePassword);

// route for signup 
router.post('/signup',signup);

// route for login
 router.post('/login',login);

module.exports = router;
