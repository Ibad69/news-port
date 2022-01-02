const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();

router.post("/signUp", userController.signUp);
router.post("/signIn", userController.signIn);

module.exports = router;
