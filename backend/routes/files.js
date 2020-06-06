const express = require("express");
const router = express.Router();
const {
  requireSignin,
  adminMiddleware,
  authMiddleware,
} = require("../controllers/auth");

//controllers
const { saveFeatured } = require("../controllers/files");

router.put("/uploads/:directory", requireSignin, authMiddleware, saveFeatured);

module.exports = router;
