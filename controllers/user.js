const user = require("../models/user");
const report = require("../models/reports");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verification = require("../funcs/verificationCode");

exports.signUp = async (req, res) => {
  const body = req.body;
  console.log(req);
  user.findOne({ email: body.email }).then((found) => {
    if (found) {
      return res.json({
        status: "success",
        message: "user exists with this email",
      });
    }

    const hashedPw = bcrypt
      .hash(body.password, 12)
      .then((hashedPw) => {
        const newUser = new user(req.body);
        newUser.password = hashedPw;
        newUser
          .save()
          .then((result) => {
            res.json({
              status: "success",
              message: "user created successfully",
            });
          })
          .catch((error) => {
            res.json({ status: "failed", message: error });
          });
      })
      .catch((error) => {
        res.json({ status: "failed", message: error });
      });
  });
};

exports.signIn = async (req, res) => {
  let foundUser;
  user
    .findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.json({
          status: "failed",
          message: "the user has not been found with this email/name",
        });
      }
      foundUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((ifEqual) => {
      if (!ifEqual) {
        res.json({
          status: "failed",
          message: "incorrect password",
        });
      }
      const token = jwt.sign(
        {
          userName: foundUser.userName,
          email: foundUser.email,
          id: foundUser._id,
        },
        "mypassword",
        { expiresIn: "1d" }
      );
      res.json({
        status: "success",
        message: "the user has been loggedIn",
        Data: foundUser,
        userID: foundUser._id,
        token: token,
      });
    });
};

exports.sendRequest = async (req, res) => {
  let check = false;
  let index = 0;
  await user.findOne({ _id: req.body.userId }).then((result) => {
    result.userFollowers.forEach((item) => {
      let senderId = JSON.stringify(item._id);
      let userId = JSON.stringify(req.user.id);
      if (userId === senderId) {
        check = true;
        result.userFollowers.splice(index, 1);
        result.save();
      }
      console.log(index);
      index++;
    });

    if (check === true) {
      console.log("here");
      return res.json({
        status: "success",
        message: "unfollowed",
      });
    }
    if (check === false) {
      result.userFollowers.push(req.user.id);
      result.save().then((saved) => {
        user.findOne({ _id: req.user.id }).then((second) => {
          second.userFollowing.push(req.body.userId);
          second
            .save()
            .then((result) => {
              return res.json({
                status: "success",
                message: "followed",
              });
            })
            .catch((err) => {
              return res.json({
                status: "failed",
                message: "couldnt follow",
              });
            });
        });
      });
    }
  });
};

exports.getFollowersFollowings = async (req, res) => {
  user
    .find({ _id: req.body.userId }, { userFollowers: 1, userFollowing: 1 })
    .then(async (result) => {
      let followers = [];
      let followings = [];
      result[0].userFollowers.forEach((item) => {
        followers.push(item);
      });
      result[0].userFollowing.forEach((item) => {
        followings.push(item);
      });
      let Ufollowers = await user.find(
        { _id: { $in: followers } },
        { _id: 1, userName: 1, profileImage: 1 }
      );
      let Ufollowing = await user.find(
        { _id: { $in: followings } },
        { _id: 1, userName: 1, profileImage: 1 }
      );
      let newObj = {};
      newObj.userFollowers = Ufollowers;
      newObj.userFollowing = Ufollowing;

      return res.json({
        status: "success",
        message: "foundPosts",
        Data: newObj,
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

exports.accepRequest = async (req, res) => {
  user.findOne({ _id: req.body.userId }).then((result) => {
    result.userFollowers.push(req.body.acceptId);
    result.save().then((saved) => {
      user
        .findOneAndUpdate(
          { _id: req.body.userId },
          { $pull: { pendingRequest: { _id: req.body.acceptId } } }
        )
        .then((result) => {
          user.findOne({ _id: req.body.acceptId }).then((second) => {
            second.userFollowing.push(req.body.userId);
            second
              .save()
              .then((result) => {
                return res.json({
                  status: "success",
                  message: "accepted request",
                });
              })
              .catch((err) => {
                return res.json({
                  status: "failed",
                  message: "couldnt accept req",
                });
              });
          });
        });
    });
  });
};

exports.reportPost = async (req, res) => {
  let check = false;
  report.findOne({ reportOption: req.body.reportOption }).then((result) => {
    result.reports.forEach((item) => {
      let reportedByUserId = JSON.stringify(item.reportedByUser);
      let userId = JSON.stringify(req.user.id);
      let reportedPost = JSON.stringify(item.reportedPost);
      let postId = JSON.stringify(req.body.postId);
      console.log(reportedByUserId);
      console.log(userId);
      console.log(reportedPost);
      console.log(postId);
      if (reportedByUserId === userId && reportedPost === postId) {
        check = true;
      }
    });

    if (check === true) {
      return res.json({
        status: "success",
        message: "you have already reported this post",
      });
    } else if (check === false) {
      let reports1 = {
        reportedByUser: req.user.id,
        reportedPost: req.body.postId,
        reportText: req.body.reportText,
      };
      result.reports.push(reports1);
      result.save().then((finalResult) => {
        if (finalResult) {
          return res.json({
            status: "success",
            message: "reported the post",
          });
        } else {
          return res.json({
            status: "failed",
            message: "couldnt report",
          });
        }
      });
    }
  });
};

exports.getUserInfo = async (req, res) => {
  user
    .find({ _id: req.body.userId })
    .then((result) => {
      return res.json({
        status: "success",
        message: "found",
        data: result,
      });
    })
    .catch((err) => {
      return res.json({
        status: "failed",
        message: "couldnt accept req",
      });
    });
};

exports.forgotPassword = async (req, res) => {
  user.findOne({ email: req.body.email }).then(async (result) => {
    const pw = await verification.sendPasswordOTP(req.body.email, result._id);
    if (pw !== null) {
      result.resetToken = pw;
      await result.save();
      console.log(result);
      return res.json({
        status: "success",
        message: "Email sent successfully",
      });
    } else {
      return res.json({
        status: "fail",
        error: "Email not sent",
      });
    }
  });
};

exports.verifyPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;
  jwt.verify(resetToken, "linkitsoft123", function (error, decoded) {
    if (error) {
      return res.json({
        status: "failed",
        error: "incorrent or expired token",
      });
    } else {
      console.log(decoded);
      user
        .findOne({ _id: decoded._id })
        .then(async (result) => {
          const hashedPw = await bcrypt.hash(newPassword, 12);
          result.password = hashedPw;
          await result.save();
          return res.json({
            status: "success",
            message: "password reset successfull",
          });
        })
        .catch((error) => {
          return res.json({
            status: "failed",
            message: "no user found with this token",
            error: error,
          });
        });
    }
  });
};

exports.AllUsers = async (req, res) => {
  user
    .aggregate([
      {
        $lookup: {
          from: "posts",
          as: "posts",
          let: { userId: "$_id" },
          pipeline: [{ $match: { $expr: { $eq: ["$userId", "$$userId"] } } }],
        },
      },
      {
        $lookup: {
          from: "channels",
          as: "channels",
          let: { userId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$userId", "$$userId"] } } },
            {
              $project: {
                userName: 1,
                email: 1,
                _id: 1,
                "posts._id": 1,
              },
            },
          ],
        },
      },
    ])
    .then((result) => {
      console.log(result);
      return res.json({
        status: "success",
        data: result,
      });
    });
};
