const User = require("../models/user");
const Blog = require("../models/blog");
const _ = require("lodash");
const formidable = require("formidable");
const fs = require("fs");

const { errorHandler } = require("../helpers/dbErrorHandler");

exports.read = (req, res) => {
  if (req.profile) req.profile.hashed_password = undefined;
  return res.json(req.profile);
};

exports.publicProfile = (req, res) => {
  let username = req.params.username;
  let user;
  let blogs;

  User.findOne({ username }).exec((err, data) => {
    if (err || !data) {
      res.status(400).json({
        error: "User not found",
      });
    }
    user = data;
    Blog.find({ postedBy: user._id })
      .populate("categories", "_id name slug")
      .populate("tags", "_id name slug")
      .populate("postedBy", "_id name")
      .limit(10)
      .select(
        "_id title slug excerpt categories tags postedBy createdAt, updatedAt"
      )
      .exec((err, blogs) => {
        console.log(blogs);
        if (err) {
          return res.status(400).json({
            error: errorHandler(error),
          });
        }
        user.photo = undefined;
        user.hashed_password = undefined;
        res.json({ user, blogs });
      });
  });
};
exports.update = (req, res) => {
  let form = new formidable.IncomingForm();

  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Photo couldn't be uploaded",
      });
    }
    let user = req.profile;
    user = _.extend(user, fields);

    if (fields.password && fields.password.length < 6) {
      return res.status(400).json({
        error: "Password should be  minimum  6 characters long",
      });
    }
    if (files.photo) {
      if (files.photo.size > 10000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb",
        });
      }
      user.photo.data = fs.readFileSync(files.photo.path);
      user.photo.contentType = files.photo.type;
    }

    user.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(error),
        });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      user.photo = undefined;

      res.json(user);
    });
  });
};
exports.photo = (req, res) => {
  const { username } = req.params;
  User.findOne({ username }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    if (user.photo.data) {
      res.set("Content-Type", user.photo.contentType);
      return res.send(user.photo.data);
    }
  });
};
