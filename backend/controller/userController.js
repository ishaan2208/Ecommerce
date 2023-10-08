const catchAsyncError = require("../middleware/catchAsyncError");
const Errorhandler = require("../utils/errorhandler");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");


//* Register User

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a sample id",
      url: "profilepicURL",
    },
  });

sendToken(user, 200, res);
});


//* Login User


exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new Errorhandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new Errorhandler("Invalid email or password", 401));
  }

   const isPasswordMatched = await user.comparePassword(password);

   if (!isPasswordMatched) {
     return next(new Errorhandler("Invalid email or password", 401));
   }

  sendToken(user,200,res)

});

//* Logout User 

exports.logout = catchAsyncError(async(req,res,next) => {

  res.cookie("token",null,{
    expires:new Date(Date.now()),
    httpOnly:true,
  })


  res.status(201).json({
    success:true,
    message:"Logged out successfully",
  })
})