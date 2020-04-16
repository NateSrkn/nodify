"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTopicById = exports.getAllTopics = exports.createTopic = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Topic = _interopRequireDefault(require("../models/Topic"));

var createTopic = function createTopic(req, res) {
  var topic = new _Topic["default"]({
    title: req.body.title,
    description: req.body.description,
    createdBy: {
      id: req.user.id,
      username: req.user.username
    },
    members: [{
      id: req.user.id,
      username: req.user.username
    }]
  });
  return topic.save().then(function (topic) {
    return res.status(200).json({
      topic: topic
    });
  })["catch"](function (error) {
    res.status(500).json({
      error: error.message
    });
  });
};

exports.createTopic = createTopic;

var getAllTopics = function getAllTopics(req, res) {
  var perPage = parseInt(req.query.perPage) || 20;
  var filter = req.query.filter || '';
  var currentPage = req.query.page > 0 ? req.query.page - 1 : 0;
  var sortBy = req.query.sortBy || 'createdAt';
  var orderBy = req.query.orderBy || 'desc';
  var sortQuery = (0, _defineProperty2["default"])({}, sortBy, orderBy);
  var filterQuery = {
    title: new RegExp(filter, 'i')
  };

  _Topic["default"].countDocuments(filterQuery).then(function (topicCount) {
    if (currentPage * perPage > topicCount) return res.status(400).json({
      message: 'No topics here'
    });

    _Topic["default"].find(filterQuery).limit(perPage).skip(currentPage * perPage).sort(sortQuery).select('id title description createdBy createdAt').then(function (topics) {
      return res.status(200).json({
        topics: topics,
        total: topicCount,
        page: parseInt(req.query.page) || 1,
        perPage: perPage
      });
    })["catch"](function (error) {
      res.status(500).json({
        success: false,
        message: 'We ran into a problem',
        error: error.message
      });
    });
  })["catch"](function (error) {
    console.log(error);
  });
};

exports.getAllTopics = getAllTopics;

var getTopicById = function getTopicById(req, res) {
  var id = req.params.topicId;

  _Topic["default"].findById(id).then(function (topic) {
    res.status(200).json({
      topic: topic
    });
  })["catch"](function (error) {
    res.status(500).json({
      success: false,
      message: "Unable to find topic with id of ".concat(id),
      error: error.message
    });
  });
};

exports.getTopicById = getTopicById;