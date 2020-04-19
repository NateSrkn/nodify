"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletePost = exports.getPostById = exports.createPost = void 0;

var _Topic = _interopRequireDefault(require("../models/Topic"));

var createPost = function createPost(req, res) {
  var post = {
    title: req.body.title,
    body: req.body.body,
    createdBy: {
      id: req.user.id,
      username: req.user.username
    }
  };

  _Topic["default"].findById(req.params.topicId).then(function (topic) {
    topic.posts.push(post);
    topic.save().then(function () {
      return res.status(200).json({
        topic: topic
      });
    })["catch"](function (error) {
      res.status(500).json({
        error: error.message
      });
    });
  })["catch"](function (error) {
    res.status(500).json({
      error: error.message
    });
  });
};

exports.createPost = createPost;

var getPostById = function getPostById(req, res) {
  var topicId = req.params.topicId;
  var postId = req.params.postId;

  _Topic["default"].findById(topicId).then(function (topic) {
    var post = topic.posts.id(postId);
    res.status(200).json({
      post: post
    });
  });
};

exports.getPostById = getPostById;

var deletePost = function deletePost(req, res) {};

exports.deletePost = deletePost;