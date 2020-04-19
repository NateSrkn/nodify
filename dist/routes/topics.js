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

var _comments = require("../controllers/comments");

var router = _express["default"].Router();

exports.topicsRoute = router;
router.get('/', _topics.getAllTopics);
router.get('/:topicId', _topics.getTopicById);
router.get('/:topicId/posts/:postId', _posts.getPostById);
router.post('/', _helper.verifyToken, _topics.createTopic);
router.post('/:topicId/posts', _helper.verifyToken, _posts.createPost);
router.post('/:topicId/posts/:postId', _helper.verifyToken, _comments.createComment); // TODO: PATCH Topic Path and DELETE Path
// router.patch('/:topicId', verifyToken ,updateTopic)
// router.delete('/:topicId', verifyToken, deleteTopic)