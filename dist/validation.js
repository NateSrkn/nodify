"use strict";

var Joi = require('@hapi/joi'); // Register User


var userValidation = function userValidation(body) {
  var schema = Joi.object({
    name: Joi.string().required().pattern(new RegExp("^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,]{1,20}$")),
    username: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  });
  return schema.validate(body);
};

var updateUserValidation = function updateUserValidation(body) {
  var schema = Joi.object({
    name: Joi.string().pattern(new RegExp("^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,]{1,20}$")),
    username: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  });
  return schema.validate(body);
};

var loginValidation = function loginValidation(body) {
  var schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  });
  return schema.validate(body);
};

var topicValidation = function topicValidation(body) {
  var schema = Joi.object({
    title: Joi.string().required().pattern(new RegExp("(\\s)")),
    description: Joi.string()
  });
  return schema.validate(body);
};

module.exports = {
  userValidation: userValidation,
  updateUserValidation: updateUserValidation,
  topicValidation: topicValidation,
  loginValidation: loginValidation
};