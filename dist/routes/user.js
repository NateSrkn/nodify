"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usersRoute = void 0;

var _express = _interopRequireDefault(require("express"));

var _helper = require("../helpers/helper");

var _users = require("../controllers/users");

var router = _express["default"].Router();

exports.usersRoute = router;
router.post('/', _users.createUser);
router.get('/', _helper.verifyToken, _users.getAllUsers);
router.get('/:userId', _helper.verifyToken, _users.getUserById);
router.patch('/:userId', _helper.verifyToken, _users.updateUser);
router["delete"]('/:userId', _helper.verifyToken, _users.deleteUser);