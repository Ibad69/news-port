const express = require("express");
const postController = require("../controllers/post");
const router = express.Router();
const authToken = require("../funcs/authenticateToken");

router.post("/createPost", authToken, postController.createPost);
router.post("/createCategory", authToken, postController.createCategory);
router.post("/getAllPost", postController.getPost);
// router.post("/getAllPostWithToken", authToken, postController.getPost1);
router.post("/getPostByCategory", postController.getPostByCategory);
router.post("/getPostByUser", postController.getPostByUser);
router.post("/getPostById", authToken, postController.getPostById);
router.post("/getPostComments", postController.getPostComments);
router.post("/addComment", authToken, postController.addCommentToPost);
router.post("/addLike", authToken, postController.addLike);
router.post("/addDislike", authToken, postController.addDislike);
router.post("/uploadFile", authToken, postController.uploadFile);
router.post("/getPostWithCategory", postController.getPostWithCategory);
router.post(
  "/getUserFollowersPost",
  authToken,
  postController.getUserFollowersPost
);
router.post("/getCategories", postController.getCategories);
router.post("/editComment", postController.editComment);
router.post("/deleteComment", postController.deleteComment);

module.exports = router;
