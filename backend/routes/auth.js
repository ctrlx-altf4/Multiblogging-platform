const express = require("express");
const router = express.Router();

//controllers
const {
  signup,
  signin,
  signout,
  requireSignin,
} = require("../controllers/auth");

//validators
const { runValidation } = require("../validators");
const {
  userSignupValidator,
  userSigninValidator,
} = require("../validators/auth");

router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/signin", userSigninValidator, runValidation, signin);
router.get("/signout", signout);

router.get("/secret", requireSignin, (req, res) => {
  res.json({
    user: req.user,
  });
});
module.exports = router;
