"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.topicsRoute = void 0;

var _express = _interopRequireDefault(require("express"));

var _helper = require("../helpers/helper");

var _topics = require("../controllers/topics");

var _posts = require("../controllers/posts");

var router = _express["default"].Router();

exports.topicsRoute = router;
router.get('/', _topics.getAllTopics);
router.get('/:topicId', _topics.getTopicById);
router.post('/', _helper.verifyToken, _topics.createTopic);
router.post('/:topicId/posts', _helper.verifyToken, _posts.createPost); // router.get('/:topicId', getTopicById)
// router.patch('/:topicId', verifyToken ,updateTopic)
// router.delete('/:topicId', verifyToken, deleteTopic)