const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const shortId = require("shortid");

exports.signup = (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email already exists",
      });
    }
    let username = shortId.generate();
    let profile = `${process.env.CLIENT_URL}/profile/${username}`;

    let newUser = new User({ name, email, password, profile, username });
    newUser.save((err, success) => {
      if (err) {
        res.status(400).json({
          error: err,
        });
      }
      res.json({
        message: "Signup Success! Please Sign in",
      });
    });
  });
};

exports.signin = (req, res) => {
  const { password, email } = req.body;
  //check if user exists
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email doesn't exist. Please Sign up",
      });
    }
    //authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password don't match",
      });
    }
    //generate a token and  send to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, { expiresIn: "1d" });
    const { _id, username, name, email, role } = user;
    return res.json({
      token,
      user: { _id, username, name, email, role },
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "You are Signed out",
  });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
});

exports.authMiddleware = (req, res, next) => {
  const authUserId = req.user._id;
  User.findById({ _id: authUserId }).exec((err, user) => {
    if (err || !user) {
      res.status(404).json("User not found");
    }
    req.profile = user;
    next();
  });
};

exports.adminMiddleware = (req, res, next) => {
  const adminUserId = req.user._id;
  User.findById({ _id: adminUserId }).exec((err, user) => {
    if (err || !user) {
      res.status(400).json("User not found");
    }
    // role=1 is for admin
    if (user.role !== 1) {
      res.status(400).json("Admin resource access denied");
    }
    console.log(req.body.name);
    req.profile = user;
    next();
  });
};
