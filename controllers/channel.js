const channel = require("../models/channel");

exports.createChannel = (req, res) => {
  body = req.body;
  body.userId = req.user.id;
  const newChannel = new channel(body);
  newChannel
    .save()
    .then((result) => {
      return res.json({
        status: "success",
        message: "channel created",
      });
    })
    .catch((error) => {
      return res.json({
        status: "failed",
        message: "there was error creating channel",
        error: error,
      });
    });
};

exports.getChannel = (req, res) => {
  let isLiked = 0;
  let finalArray = [];
  channel.findOne({ _id: req.body.channelId }).then((result) => {
    result.posts.forEach((item) => {
      item.likes.forEach((item2) => {
        if (JSON.stringify(item2.userId) === JSON.stringify(req.body.userId)) {
          isLiked = 1;
        } else {
          isLiked = 0;
        }
        console.log(item2);
      });
      let obj = {};
      obj._id = result._id;
      obj.userId = result.userId;
      obj.categoryId = result.categoryId;
      obj.title = result.title;
      obj.profileImage = result.profileImage;
      obj.coverImage = result.coverImage;
      obj.blockStatus = result.blockStatus;
      obj.posting = result.posting;
      let posts = [
        {
          dislikes: item.dislikes,
          title: item.title,
          description: item.description,
          blockStatus: item.blockStatus,
          views: item.views,
          _id: item._id,
          comments: item.comments,
          image: item.image,
          video: item.video,
          likes: item.likes,
          isLiked: isLiked,
        },
      ];
      obj.posts = posts;
      finalArray.push(obj);
    });

    return res.json(finalArray);
  });
};

exports.createChannelPost = (req, res) => {
  channel
    .findOne({ _id: req.body.channelId })
    .then((result) => {
      result.posts.push(req.body);
      result.save();
      return res.json({
        status: "success",
        message: "added channel post",
        Data: result.posts,
      });
    })
    .catch((error) => {
      return res.json({
        status: "failed",
        message: "cant add into channel post",
      });
    });
};

exports.channelPostOpenView = async (req, res) => {
  channel
    .findOne({ _id: req.body.channelId })
    .select({ posts: { $elemMatch: { _id: req.body.postId } } })
    .then((result) => {
      return res.json({
        status: "success",
        message: "foundPost",
        Data: result,
      });
    })
    .catch((error) => {
      return res.json({
        status: "failed",
        message: "couldn't find post",
        error: error,
      });
    });
};

exports.addCommentToChannelPost = async (req, res) => {
  channel
    .findOne({ _id: req.body.channelId })
    .select({ posts: { $elemMatch: { _id: req.body.postId } } })
    .then((result) => {
      let cmntobj = {
        userId: req.body.userId,
        comment: req.body.comment,
      };
      result.posts[0].comments.push(cmntobj);
      result
        .save()
        .then((saved) => {
          return res.json({
            message: "added comment",
            cmnt: saved.posts[0].comments,
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

exports.getChannelByUser = async (req, res) => {
  channel
    .find({ userId: req.body.userId })
    .then((result) => {
      return res.json({
        status: "success",
        message: "foundChannels",
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

exports.addChannelPostLike = async (req, res) => {
  let check = false;

  channel
    .findOne({ _id: req.body.channelId })
    .select({ posts: { $elemMatch: { _id: req.body.postId } } })
    .then((result) => {
      let i = 0;
      result.posts[0].likes.forEach((item) => {
        console.log(i);
        if (JSON.stringify(item.userId) === JSON.stringify(req.user.id)) {
          console.log(i);
          check = true;
          result.posts[0].likes.splice(i, 1);
          result.save();
          return res.json({
            status: "success",
            message: "likeRemoved",
          });
        }
        i++;
      });
      if (check === false) {
        const user = { userId: req.body.userId };
        result.posts[0].likes.push(user);
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

// .findOneAndUpdate(
//   { _id: req.body.postId, "comments._id": req.body.commentId },
//   { $set: { "comments.$.comment": req.body.comment } }
// )
