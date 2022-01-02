const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();
const authToken = require("../funcs/authenticateToken");

router.post("/sendRequest", authToken, userController.sendRequest);
router.post("/accepRequest", userController.accepRequest);
router.post("/getFollowersFollowings", userController.getFollowersFollowings);
router.post("/reportPost", userController.reportPost);
router.post("/getUserInfo", userController.getUserInfo);
router.post("/forgotPassword", userController.forgotPassword);
router.post("/verifyPassword", userController.verifyPassword);

module.exports = router;
