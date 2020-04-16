"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commentSchema = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var commentSchema = _mongoose["default"].Schema({
  message: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true,
  versionKey: false
});

exports.commentSchema = commentSchema;