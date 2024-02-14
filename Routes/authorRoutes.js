const express = require("express");
const router = express.Router();
const authorController = require("../Controllers/authorController");
router.route("/").post(authorController.createAuthor)

module.exports = router;
