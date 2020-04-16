"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.topicValidation = exports.loginValidation = exports.updateUserValidation = exports.userValidation = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

// Register User
var userValidation = function userValidation(body) {
  var schema = _joi["default"].object({
    name: _joi["default"].string().required().pattern(new RegExp("^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,]{1,20}$")),
    username: _joi["default"].string().required(),
    email: _joi["default"].string().required().email(),
    password: _joi["default"].string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  });

  return schema.validate(body);
};

exports.userValidation = userValidation;

var updateUserValidation = function updateUserValidation(body) {
  var schema = _joi["default"].object({
    name: _joi["default"].string().pattern(new RegExp("^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,]{1,20}$")),
    username: _joi["default"].string(),
    email: _joi["default"].string().email(),
    password: _joi["default"].string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  });

  return schema.validate(body);
};

exports.updateUserValidation = updateUserValidation;

var loginValidation = function loginValidation(body) {
  var schema = _joi["default"].object({
    email: _joi["default"].string().required().email(),
    password: _joi["default"].string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  });

  return schema.validate(body);
};

exports.loginValidation = loginValidation;

var topicValidation = function topicValidation(body) {
  var schema = _joi["default"].object({
    title: _joi["default"].string().required().pattern(new RegExp("(\\s)")),
    description: _joi["default"].string()
  });

  return schema.validate(body);
};

exports.topicValidation = topicValidation;