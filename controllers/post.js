const post = require("../models/post");
const User = require("../models/user");
const category = require("../models/category");
const media = require("../funcs/uploadAWS");
const moment = require("moment");

exports.createPost = async (req, res) => {
  const body = req.body;
  body.userId = req.user.id;
  const newPost = new post(req.body);
  if (!body.userId) {
    return res.json({
      status: "failed",
      message: "please provide a userId",
    });
  }
  if (!body.categoryId) {
    return res.json({
      status: "failed",
      message: "please provide a category",
    });
  }
  newPost
    .save()
    .then((result) => {
      return res.json({
        status: "success",
        message: "postCreated",
        Data: result,
      });
    })
    .catch((error) => {
      return res.json({
        status: "failed",
        message: "there was an error creating the post",
        error: error,
      });
    });
};

exports.getPost = async (req, res) => {
  let foundPost;

  post
    .find()
    .populate({ path: "userId", select: { userName: 1, profileImage: 1 } })
    .populate({ path: "categoryId", select: { name: 1 } })
    .then((result) => {
      console.log(result);
      let finalArray = [];
      result.forEach((item) => {
        let isLiked = false;
        let isDisliked = false;
        item.likes.forEach((item1) => {
          if (req.body.userId !== "none") {
            if (
              JSON.stringify(item1.userId) === JSON.stringify(req.body.userId)
            ) {
              isLiked = true;
            }
          }
        });
        item.dislikes.forEach((item2) => {
          if (req.body.userId !== "none") {
            if (
              JSON.stringify(item2.userId) === JSON.stringify(req.body.userId)
            ) {
              isDisliked = true;
            }
          }
        });
        let obj = {};
        obj._id = item._id;
        obj.userId = item.userId;
        obj.categoryId = item.categoryId;
        obj.createdAt = moment(item.createdAt).format("MMMM DD, YYYY HH:mm A");
        obj.title = item.title;
        obj.description = item.description;
        obj.location = item.location;
        obj.image = item.image;
        obj.videos = item.videos;
        obj.blockStatus = item.blockStatus;
        obj.availability = item.availability;
        obj.views = item.views;
        obj.comments = item.comments;
        obj.updatedAt = item.updatedAt;
        obj.dislikes = item.dislikes;
        obj.likes = item.likes;
        obj.isLiked = isLiked;
        obj.isDisliked = isDisliked;
        finalArray.push(obj);
      });

      return res.json(finalArray);
    });
};

exports.getPostByCategory = async (req, res) => {
  post
    .find({ categoryId: req.body.categoryId })
    .populate({ path: "userId", select: { userName: 1, profileImage: 1 } })
    .then((result) => {
      let finalArray = [];
      result.forEach((item) => {
        let isLiked = false;
        let isDisliked = false;
        item.likes.forEach((item1) => {
          if (req.body.userId !== "none") {
            if (
              JSON.stringify(item1.userId) === JSON.stringify(req.body.userId)
            ) {
              isLiked = true;
            }
          }
        });
        item.dislikes.forEach((item2) => {
          if (req.body.userId !== "none") {
            if (
              JSON.stringify(item2.userId) === JSON.stringify(req.body.userId)
            ) {
              isDisliked = true;
            }
          }
        });
        let obj = {};
        obj._id = item._id;
        obj.userId = item.userId;
        obj.title = item.title;
        obj.description = item.description;
        obj.location = item.location;
        obj.image = item.image;
        obj.videos = item.videos;
        obj.blockStatus = item.blockStatus;
        obj.availability = item.availability;
        obj.views = item.views;
        obj.comments = item.comments;
        obj.updatedAt = item.updatedAt;
        obj.dislikes = item.dislikes;
        obj.likes = item.likes;
        obj.isLiked = isLiked;
        obj.isDisliked = isDisliked;
        finalArray.push(obj);
      });

      return res.json({
        status: "success",
        message: "foundPosts",
        Data: finalArray,
      });
    })
    .catch((error) => {
      return res.json({
        status: "failed",
        message: "error",
        error: error,
      });
    });
};

exports.getPostByUser = async (req, res) => {
  let foundPost;

  post
    .find({ userId: req.body.postUser })
    .populate({ path: "userId", select: { userName: 1, profileImage: 1 } })
    .populate({ path: "categoryId", select: { name: 1 } })
    .then((result) => {
      console.log(result);
      let finalArray = [];
      result.forEach((item) => {
        let isLiked = false;
        let isDisliked = false;
        item.likes.forEach((item1) => {
          if (req.body.userId !== "none") {
            if (
              JSON.stringify(item1.userId) === JSON.stringify(req.body.userId)
            ) {
              isLiked = true;
            }
          }
        });
        item.dislikes.forEach((item2) => {
          if (req.body.userId !== "none") {
            if (
              JSON.stringify(item2.userId) === JSON.stringify(req.body.userId)
            ) {
              isDisliked = true;
            }
          }
        });
        let obj = {};
        obj._id = item._id;
        obj.userId = item.userId;
        obj.categoryId = item.categoryId;
        obj.createdAt = moment(item.createdAt).format("MMMM DD, YYYY HH:mm A");
        obj.title = item.title;
        obj.description = item.description;
        obj.location = item.location;
        obj.image = item.image;
        obj.videos = item.videos;
        obj.blockStatus = item.blockStatus;
        obj.availability = item.availability;
        obj.views = item.views;
        obj.comments = item.comments;
        obj.updatedAt = item.updatedAt;
        obj.dislikes = item.dislikes;
        obj.likes = item.likes;
        obj.isLiked = isLiked;
        obj.isDisliked = isDisliked;
        finalArray.push(obj);
      });

      return res.json(finalArray);
    });
};

exports.getPostById = async (req, res) => {
  post
    .findOne({ _id: req.body.postId })
    .populate({ path: "userId", select: { userName: 1, profileImage: 1 } })
    .then((result) => {
      return res.json({
        status: "success",
        message: "foundPosts",
        Data: result,
      });
    })
    .catch((error) => {
      return res.json({
        status: "failed",
        message: "error",
        error: error,
      });
    });
};

exports.getPostComments = async (req, res) => {
  post
    .findOne({ _id: req.body.postId }, { title: 1, comments: 1, createdAt: 1 })
    .populate({ path: "userId", select: { userName: 1, profileImage: 1 } })
    .populate({
      path: "comments",
      populate: { path: "userId", select: { userName: 1, profileImage: 1 } },
    })
    .exec()
    .then((result) => {
      return res.json({
        status: "success",
        message: "foundPosts",
        Data: result,
      });
    })
    .catch((error) => {
      return res.json({
        status: "failed",
        message: "error",
        error: error,
      });
    });
};

exports.addCommentToPost = async (req, res) => {
  let fPost;
  post.findOne({ _id: req.body.postId }).then((result) => {
    let cmntobj = {
      userId: req.body.userId,
      comment: req.body.comment,
    };
    result.comments.push(cmntobj);
    console.log(result.comments);
    result
      .save()
      .then((saved) => {
        return res.json({
          message: "added comment",
          cmnt: saved.comments,
        });
      })
      .catch((error) => {
        return res.json({
          message: "failed adding a comment",
          error: error,
        });
      });
  });
};

exports.addLike = async (req, res) => {
  const body = req.body;
  let check = false;
  post
    .findOne({ _id: req.body.postId }, { likes: 1, dislikes: 1 })
    .then((result) => {
      let i = 0;
      result.likes.forEach((item) => {
        console.log(i);
        if (JSON.stringify(item.userId) === JSON.stringify(req.user.id)) {
          console.log(i);
          check = true;
          result.likes.splice(i, 1);
          result.save();
          return res.json({
            status: "success",
            message: "likeRemoved",
          });
        }
        i++;
      });
      if (check === false) {
        for (let i = 0; i < result.dislikes.length; i++) {
          if (
            JSON.stringify(result.dislikes[i].userId) ===
            JSON.stringify(req.user.id)
          ) {
            result.dislikes.splice(i, 1);
            i--;
          }
        }
        let obj = {
          userId: req.user.id,
        };
        result.likes.push(obj);
        result
          .save()
          .then((saved) => {
            return res.json({
              status: "success",
              message: "addedLike",
              Data: saved,
            });
          })
          .catch((error) => {
            return res.json({
              status: "failed",
              message: "there was an error liking the post",
            });
          });
      }
    });
};

exports.addDislike = async (req, res) => {
  const body = req.body;
  let check = false;
  post
    .findOne({ _id: req.body.postId }, { dislikes: 1, likes: 1 })
    .then((result) => {
      for (let i = 0; i < result.likes.length; i++) {
        if (
          JSON.stringify(result.likes[i].userId) === JSON.stringify(req.user.id)
        ) {
          result.likes.splice(i, 1);
          i--;
        }
      }
      let count = 0;
      result.dislikes.forEach((item) => {
        if (JSON.stringify(item.userId) === JSON.stringify(req.user.id)) {
          check = true;
          result.dislikes.splice(count, 1);
          result.save();
          return res.json({
            status: "success",
            message: "dislikeRemoved",
          });
        }
        count++;
      });
      if (check === false) {
        let obj = {
          userId: req.user.id,
        };
        result.dislikes.push(obj);
        result
          .save()
          .then((saved) => {
            return res.json({
              status: "success",
              message: "added dislike",
              Data: saved,
            });
          })
          .catch((error) => {
            return res.json({
              status: "failed",
              message: "there was an error liking the post",
            });
          });
      }
    });
};

//create category will be put into admin
exports.createCategory = async (req, res) => {
  const body = req.body;

  const newCategory = new category(req.body);
  newCategory
    .save()
    .then((result) => {
      return res.json({
        status: "success",
        message: "categoryCreated",
        Data: result,
      });
    })
    .catch((error) => {
      return res.json({
        status: "failed",
        message: "there was an error creating the post",
      });
    });
};

exports.uploadFile = async (req, res) => {
  console.log(req);
  // console.log("insert -> req.files", req.files);
  // try {
  //   if (!req.files || !req.files.length) {
  //     return res.json({
  //       status: "failed",
  //       message: "no files found",
  //     });
  //   }
  //   let { uploadFor } = req.body;
  //   const uploadFors = ["test"];
  //   if (!uploadFor) {
  //     return res.json({
  //       status: "failed",
  //       message: "no upload for",
  //     });
  //   }

  //   if (!uploadFors.includes(uploadFor)) {
  //     return res.json({
  //       status: "failed",
  //       message: "invalid upload for",
  //     });
  //   }

  //   let link = [];
  //   for (var i = 0; i < req.files.length; i++) {
  //     const uploadedLink = await media.s3Upload(uploadFor, req.files[i]);
  //     link.push(uploadedLink);
  //   }
  //   return res.json({
  //     status: "success",
  //     message: "file uploaded",
  //     link: process.env.AWS_S3_URL + "/" + link,
  //   });
  // } catch (error) {
  //   console.log(error);
  //   return res.json({
  //     status: "failed",
  //     message: "error",
  //     error: error,
  //   });
  // }
};

exports.getPostWithCategory = async (req, res) => {
  post
    .find()
    .populate({ path: "categoryId", select: { name: 1 } })
    .then((result) => {
      return res.json({
        status: "success",
        message: "foundPosts",
        Data: result,
      });
    })
    .catch((error) => {
      return res.json({
        status: "failed",
        message: "error",
        error: error,
      });
    });
};

exports.getUserFollowersPost = async (req, res) => {
  User.find({ _id: req.user.id }, { userFollowers: 1 })
    .then((result) => {
      let followers = [];
      result.forEach((item) => {
        item.userFollowers.forEach((item2) => {
          followers.push(item2._id);
        });
      });
      post
        .find({ userId: { $in: followers } })
        .populate({
          path: "userId",
          select: { userName: 1, _id: 1, profileImage: 1 },
        })
        .then((result) => {
          return res.json({
            status: "success",
            message: "posts",
            data: result,
          });
        });
    })
    .catch((err) => {
      return res.json({
        status: "failed",
        message: "error",
        error: error,
      });
    });
};

exports.getCategories = async (req, res) => {
  category
    .find()
    .then((result) => {
      return res.json({
        status: "success",
        message: "found",
        Data: result,
      });
    })
    .catch((error) => {
      return res.json({
        status: "failed",
        message: "error",
        error: error,
      });
    });
};

exports.editComment = async (req, res) => {
  post
    .findOneAndUpdate(
      { _id: req.body.postId, "comments._id": req.body.commentId },
      { $set: { "comments.$.comment": req.body.comment } }
    )
    .then((result) => {
      return res.json({
        status: "success",
        message: "updated comment",
      });
    })
    .catch((error) => {
      return res.json({
        status: "failed",
        message: "error",
        error: error,
      });
    });
};

exports.deleteComment = async (req, res) => {
  post
    .findOneAndUpdate(
      { _id: req.body.postId },
      { $pull: { comments: { _id: req.body.commentId } } }
    )
    .then((result) => {
      return res.json({
        status: "success",
        message: "deleted comment",
      });
    })
    .catch((error) => {
      return res.json({
        status: "failed",
        message: "error",
        error: error,
      });
    });
};
