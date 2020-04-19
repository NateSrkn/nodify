"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createComment = void 0;

var _Topic = _interopRequireDefault(require("../models/Topic"));

var createComment = function createComment(req, res) {
  var postId = req.params.postId;
  var topicId = req.params.topicId;
  res.json({
    postId: postId,
    topicId: topicId
  });
};

exports.createComment = createComment;