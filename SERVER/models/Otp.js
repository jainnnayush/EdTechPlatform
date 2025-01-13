const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender.js');
const emailTemplate = require("../mail/templates/emailVerificationTemplate.js");

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:60*5,
    }
})


async function sendVerificationEmail(email, otp) {
	try {
		const mailResponse = await mailSender(
			email,
			"Verification Email",
			emailTemplate(otp)
		);
		console.log("Email sent successfully: ", mailResponse.response);
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}
// pre hook used to execute something before the document saved, deleted etc.
OTPSchema.pre('save',async function(next){
    if(this.isNew){
        // send the mail
        await sendVerificationEmail(this.email,this.otp); 
    }
    next();
});

const OTP = mongoose.model("OTP",OTPSchema);

module.exports = OTP;