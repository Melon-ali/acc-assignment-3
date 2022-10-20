const {
    signUpServices,
    verifyEmailServices,
    findUserByEmail,
  } = require("../services/user.services");
  const sendEmail = require("../utils/email");
  const generateToken = require("../utils/token");
  
  const signupUser = async (req, res, next) => {
    try {
      const user = await signUpServices(req.body);
  
      const token = user.generateConfirmationToken();
  
      const emailButtonLink = `${req.protocol}://${req.get("host")}${
        req.originalUrl
      }/confirmation/${token}`;
  
      const emailBody = `
      <h3>Hello ${user?.name}</h3>
      <p>Please Verify Your Account</p>
      <a href=${emailButtonLink}>Click Here</a>
      `;
      
      console.log(emailButtonLink);
  
      await user.save({ validateBeforeSave: false });
  
      if (!user) {
        return res.status(500).json({
          status: "fail",
          message: "Couldn't Create User",
          error: error.message,
        });
      }
  
      res.status(200).json({
        status: "Success",
        message: "Successfully Signed Up",
        user,
      });
    } catch (error) {
      res.status(500).json({
        status: "Fail",
        message: "Couldn't Create User",
        error: error.message,
      });
    }
  };
  
  const verifyUser = async (req, res) => {
    try {
      const { token } = req.params;
      const user = await verifyEmailServices(token);
  
      if (!user) {
        return res.status(403).json({
          status: "Fail",
          error: "Invalid Token",
        });
      }
  
      const expired = new Date() > new Date(user.confirmationTokenExpires);
  
      if (expired) {
        return res.status(401).json({
          status: "Fail",
          error: "Token Expired",
        });
      }
  
      user.status = "active";
      user.confirmationToken = undefined;
      user.confirmationTokenExpires = undefined;
  
      user.save({ validateBeforeSave: false });
  
      res.status(200).json({
        status: "Success",
        message: "Successfully Activated Your Account.",
      });
    } catch (error) {
      res.status(400).json({
        status: "Fail",
        message: "Couldn't Actived Your Account",
        error: error.message,
      });
    }
  };
  
  const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(401).json({
          status: "Fail",
          error: "Please Provide Your Credentials",
        });
      }
  
      const user = await findUserByEmail(email);
  
      if (!user) {
        return res.status(401).json({
          status: "Fail",
          error: "No User Found. Please Create An Account",
        });
      }
  
      const isPasswordValid = user.comparePassword(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(403).json({
          status: "Fail",
          error: "Password is Not Correct",
        });
      }
  
      if (user.status != "active") {
        return res.status(401).json({
          status: "Fail",
          error: "Your Account is Not Active Yet.",
        });
      }
  
      const token = generateToken(user);
  
      const { password: pass, ...others } = user.toObject();
  
      res.status(200).json({
        status: "Success",
        message: "Successfully Signed In",
        data: {
          token,
          user: others,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "Fail",
        message: "Couldn't Get User",
        error: error.message,
      });
    }
  };
  
  const getMe = async (req, res, next) => {
    try {
      const { email } = req.user || {};
      const user = await findUserByEmail(email);
      const { password: pass, ...others } = user.toObject();
  
      res.status(200).json({
        status: "Success",
        user: others,
      });
    } catch (error) {
      res.status(500).json({
        status: "Fail",
        message: "Couldn't Get User",
        error: error.message,
      });
    }
  };
  
  module.exports = { signupUser, verifyUser, loginUser, getMe };
  