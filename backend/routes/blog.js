const express = require("express");
const router = express.Router();
const {
  requireSignin,
  adminMiddleware,
  authMiddleware,
} = require("../controllers/auth");

//controllers
const {
  create,
  list,
  listAllBlogsCategoriesTags,
  read,
  remove,
  update,
  photo,
  listRelated,
  listSearch,
} = require("../controllers/blog");

router.post("/blog", requireSignin, adminMiddleware, create);
router.get("/blogs", list);
router.post("/blogs-categories-tags", listAllBlogsCategoriesTags);
router.get("/blog/:slug", read);
router.delete("/blog/:slug", requireSignin, adminMiddleware, remove);
router.patch("/blog/:slug", requireSignin, adminMiddleware, update);
router.get("/blog/photo/:slug", photo);
router.post("/blogs/related", listRelated);
router.get("/blogs/search", listSearch);

//auth user blog crud
router.post("/user/blog", requireSignin, authMiddleware, create);
router.delete("/user/blog/:slug", requireSignin, authMiddleware, remove);
router.patch("/user/blog/:slug", requireSignin, authMiddleware, update);

module.exports = router;
