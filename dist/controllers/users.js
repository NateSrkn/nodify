"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.deleteUser = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _User = _interopRequireDefault(require("../models/User"));

var _helper = require("../helpers/helper");

var _validation = require("../helpers/validation");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

_mongoose["default"].set('useFindAndModify', false);

var createUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var password, _userValidation, error, user;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _helper.hashPass)(req.body.password);

          case 2:
            password = _context.sent;
            _userValidation = (0, _validation.userValidation)(req.body), error = _userValidation.error;

            if (!error) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              error: error.details[0].message
            }));

          case 6:
            user = new _User["default"]({
              name: req.body.name,
              username: req.body.username,
              email: req.body.email,
              password: password
            });
            return _context.abrupt("return", user.save().then(function (user) {
              return res.status(200).json({
                _id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt
              });
            })["catch"](function (error) {
              res.status(500).json({
                error: error.message
              });
            }));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createUser = createUser;

var getAllUsers = function getAllUsers(req, res) {
  var perPage = parseInt(req.query.perPage) || 20;
  var filter = req.query.filter || '';
  var currentPage = req.query.page > 0 ? req.query.page - 1 : 0;
  var sortBy = req.query.sortBy || 'createdAt';
  var orderBy = req.query.orderBy || 'desc';
  var sortQuery = (0, _defineProperty2["default"])({}, sortBy, orderBy);
  var filterQuery = {
    email: new RegExp(filter, 'i')
  };

  _User["default"].countDocuments(filterQuery).then(function (userCount) {
    if (currentPage * perPage > userCount) {
      return res.status(404).json({
        message: 'There are no users here'
      });
    }

    _User["default"].find(filterQuery).limit(perPage).skip(currentPage * perPage).sort(sortQuery).select('_id name username email createdAt updatedAt').then(function (users) {
      return res.status(200).json({
        users: users,
        total: userCount,
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
  });
};

exports.getAllUsers = getAllUsers;

var getUserById = function getUserById(req, res) {
  var id = req.params.userId;

  _User["default"].findById(id).then(function (user) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt
    });
  })["catch"](function (error) {
    res.status(500).json({
      success: false,
      message: "Unable to find user with id of ".concat(id),
      error: error.message
    });
  });
};

exports.getUserById = getUserById;

var deleteUser = function deleteUser(req, res) {
  var id = req.params.userId;

  _User["default"].findById(id).then(function (user) {
    if (!user) return res.status(404).json({
      message: "User with the id of ".concat(id, " was not found")
    });
  })["catch"](function (error) {
    return error;
  });

  if (req.user.id != id) return res.status(401).json({
    message: 'Sorry, you don\'t have the right permissions to remove this user'
  });

  _User["default"].findByIdAndRemove(id).exec().then(function (user) {
    res.status(200).send({
      success: true,
      message: "".concat(id, " successfully removed."),
      user: user
    });
  })["catch"](function (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  });
};

exports.deleteUser = deleteUser;

var updateUser = function updateUser(req, res) {
  var id = req.params.userId;

  var _updateUserValidation = (0, _validation.updateUserValidation)(req.body),
      error = _updateUserValidation.error;

  _User["default"].findById(id).then(function (user) {
    if (!user) return res.status(404).json({
      message: "User with the id of ".concat(id, " was not found")
    });
  })["catch"](function (error) {
    return error;
  });

  if (error) return res.status(400).json({
    error: error.details[0].message
  });
  if (req.user.id != id) return res.status(400).json({
    message: 'Sorry, you don\'t have the right permissions to remove this user'
  });

  var update = function update(body) {
    _User["default"].updateOne({
      _id: id
    }, {
      $set: body
    }).exec().then( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var user;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _User["default"].findById(id);

            case 2:
              user = _context2.sent;
              res.status(200).json({
                message: "User ".concat(id, " successfully updated"),
                user: {
                  _id: user.id,
                  name: user.name,
                  username: user.username,
                  email: user.email,
                  createdAt: user.createdAt
                }
              });

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })))["catch"](function (error) {
      res.status(500).json({
        error: error.message
      });
    });
  };

  if (req.body.password) /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var password, updatedBody;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _helper.hashPass)(req.body.password);

          case 2:
            password = _context3.sent;
            updatedBody = _objectSpread({}, req.body, {
              password: password
            });
            update(updatedBody);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  update(req.body);
};

exports.updateUser = updateUser;