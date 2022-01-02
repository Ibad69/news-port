const express = require("express");
const channelController = require("../controllers/channel");
const router = express.Router();
const authToken = require("../funcs/authenticateToken");

router.post("/createChannel", channelController.createChannel);
router.post("/channelDetails", channelController.getChannel);
router.post("/createChannelPost", channelController.createChannelPost);
router.post("/channelPostOpenView", channelController.channelPostOpenView);
router.post(
  "/addCommentToChannelPost",
  channelController.addCommentToChannelPost
);
router.post("/getChannelByUser", channelController.getChannelByUser);
router.post("/addChannelLike", authToken, channelController.addChannelPostLike);

module.exports = router;
