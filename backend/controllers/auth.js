const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const shortId = require("shortid");
const _ = require("lodash");
//sendgrid setup
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
exports.forgotPassword = (req, res) => {
  const { email } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: "user with that email doesn't exists",
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_RESET_SECRET, {
      expiresIn: "10m",
    });

    const msg = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Password Reset Link`,
      html: `
      <h4> Please use the following link to reset your password : </h4>
      <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p> 
      <hr/>
      <p> This email may contain sensitive information </p>
      <p>${process.env.CLIENT_URL}</p>
      `,
    };

    return User.updateOne(
      { $set: { resetPasswordLink: token } },
      (err, success) => {
        if (err) {
          return res.json({ error: errorHandler(err) });
        } else {
          (async () => {
            try {
              await sgMail.send(msg).then((sent) => {
                return res.json({
                  message: `Email has been sent to ${email}. Follow the instruction to reset your Password. Link expires in 10 minute`,
                });
              });
            } catch (error) {
              console.error(error);

              if (error.response) {
                console.error(error.response.body);
              }
              return res.status(401).json({
                error: "Error While sending email. Please Try again",
              });
            }
          })();
        }
      }
    );
  });
};
exports.resetPassword = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;
  if (resetPasswordLink) {
    jwt.verify(
      resetPasswordLink,
      process.env.JWT_RESET_SECRET,
      (err, decoded) => {
        if (err) {
          return res.status(401).json({
            error: "Expired Link Try Again",
          });
        }
        User.findOne({ resetPasswordLink }, (err, user) => {
          if (err) {
            return res.status(401).json({
              error: errorHandler(err),
            });
          }
          const updatedFields = {
            password: newPassword,
            resetPasswordLink: "",
          };
          user = _.extend(user, updatedFields);
          user.save((err, success) => {
            if (err || !user) {
              return res.status(401).json({
                error: errorHandler(err),
              });
            }
            res.json({
              message: `Great Now! You can login with new Password`,
            });
          });
        });
      }
    );
  }
};
