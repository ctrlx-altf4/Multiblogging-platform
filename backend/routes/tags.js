const express = require("express");
const router = express.Router();

//middlewares
const { requireSignin, adminMiddleware } = require("../controllers/auth");
const { create, list, read, remove } = require("../controllers/tags");

//vaidators
const { categoryCreateValidator } = require("../validators/category"); // because same for both category and tags
const { runValidation } = require("../validators");

router.post(
  "/tags",
  categoryCreateValidator,
  runValidation,
  requireSignin,
  adminMiddleware,
  create
);
router.get("/tags", list);
router.get("/tag/:slug", read);
router.delete("/tag/:slug", requireSignin, adminMiddleware, remove);

module.exports = router;
