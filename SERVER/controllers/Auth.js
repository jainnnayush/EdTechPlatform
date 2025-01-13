  const OTP = require("../models/Otp");
  const User = require("../models/User");
  const otpGenerator = require("otp-generator");
  require("dotenv").config();

  exports.sendOTP = async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(401).json({
          status: false,
          message: "Email not provided",
        });
      }
      const check = await User.findOne({ email });

      if (check) {
        return res.status(401).json({
          success: false,
          message: `User is Already Registered`,
        });
      }

      var otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      const result = await OTP.findOne({ otp: otp });

      while (result) {
        otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
        });
      }

      const otpPayload = { email, otp };
      const otpBody = await OTP.create(otpPayload);

      console.log("OTP Body", otpBody);
      res.status(200).json({
        success: true,
        message: `OTP Sent Successfully`,
        otp,
      });
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ success: false, error: error.message })
    }
  };
