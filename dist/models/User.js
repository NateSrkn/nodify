"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

_mongoose["default"].set('useCreateIndex', true);

var userSchema = _mongoose["default"].Schema({
  name: {
    type: String,
    required: true,
    max: 40
  },
  username: {
    type: String,
    required: true,
    max: 30
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6
  }
}, {
  timestamps: true,
  versionKey: false
});

var _default = _mongoose["default"].model('User', userSchema);

exports["default"] = _default;