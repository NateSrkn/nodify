"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _Post = require("./Post");

_mongoose["default"].set('useCreateIndex', true);

var topicSchema = _mongoose["default"].Schema({
  title: {
    type: String,
    required: true,
    max: 40,
    unique: true
  },
  description: {
    type: String
  },
  members: {
    type: Array,
    ref: 'User'
  },
  posts: [_Post.postSchema],
  createdBy: {
    type: Object,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});

var _default = _mongoose["default"].model('Topic', topicSchema);

exports["default"] = _default;