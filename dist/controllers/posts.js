"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPost = void 0;

var Topic = require('../models/Topic');

var createPost = function createPost(req, res) {
  var post = {
    title: req.body.title,
    body: req.body.body,
    createdBy: {
      id: req.user.id,
      username: req.user.username
    }
  };
  Topic.findById(req.params.topicId).then(function (topic) {
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