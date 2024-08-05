const express = require("express");
const { findAll } = require("../controllers/roleController");
const authCheckToken = require("../middleware/authCheck");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router({ mergeParams: true });

// router.use(authCheckToken, isAdmin);
router.get("/", findAll);

module.exports = router;
