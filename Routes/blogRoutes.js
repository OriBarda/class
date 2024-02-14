const express = require("express");
const router = express.Router();
const blogController = require("../Controllers/blogController");

router.route("/").get(blogController.getAll).post(blogController.createBlog);
router
  .route("/:pk")
  .get(blogController.specBlog)
  .delete(blogController.deleteBlog)
  .patch(blogController.editBlog);

router.route("/find/title/:title").get(blogController.getTitle);

module.exports = router;
