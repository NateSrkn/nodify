"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postSchema = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _Comment = require("./Comment");

var postSchema = _mongoose["default"].Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String
  },
  comments: [_Comment.commentSchema],
  createdBy: {
    type: Array,
    required: true,
    ref: 'User'
  },
  resourceUri: {
    type: String
  }
}, {
  timestamps: true,
  versionKey: false
});

exports.postSchema = postSchema;