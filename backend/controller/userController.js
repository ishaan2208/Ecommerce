const catchAsyncError = require("../middleware/catchAsyncError");
const Errorhandler = require("../utils/errorhandler");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

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

  sendToken(user, 200, res);
});

//* Logout User

exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(201).json({
    success: true,
    message: "Logged out successfully",
  });
});

//* Logout User

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new Errorhandler("User not found", 404));
  }

  //* Get reset Password Token

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password token is :- \n\n ${resetPasswordUrl} \n\n . If you have not requested this email then, please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subeject: `Ecommerce Password Recovery `,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new Errorhandler(error.message, 500));
  }
});

//* Reset Password

exports.resetPassword = catchAsyncError(async (req,res,next) => {
  //Creating a token hash

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new Errorhandler(
        "Reset password token is invalid or has been expired ",
        404
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new Errorhandler("Password does not match", 404));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});
