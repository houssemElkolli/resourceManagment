const express = require("express");
const {
    findAll,
    findOne,
    create,
    update,
    remove,
} = require("../controllers/userController");
const authCheckToken = require("../middleware/authCheck");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router({ mergeParams: true });

router.use(authCheckToken, isAdmin);
router.get("/", findAll);
router.get("/:id([0-9]+)", findOne);
router.post("/", create);
router.put("/:id([0-9]+)", update);
router.delete("/:id([0-9]+)", remove);
module.exports = router;
