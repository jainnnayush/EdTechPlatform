const express = require('express');
const router = express.Router();

const {sendOTP} = require('../controllers/Auth.js');

router.post('/sendOTP',sendOTP);

module.exports = router;
