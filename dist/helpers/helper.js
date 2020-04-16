"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hashPass = exports.verifyToken = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var verifyToken = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var token, verified;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = req.header('x-access-token') || req.header('authorization');
            token ? token = token.slice(7, token.length) : null;

            if (token) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              error: "You must be logged in to access this route"
            }));

          case 4:
            try {
              verified = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);
              req.user = verified;
              next();
            } catch (error) {
              res.status(401).json({
                error: 'Invalid token'
              });
            }

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function verifyToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.verifyToken = verifyToken;

var hashPass = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(password) {
    var salt, hashedPass;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _bcryptjs["default"].genSalt(10);

          case 2:
            salt = _context2.sent;
            _context2.next = 5;
            return _bcryptjs["default"].hash(password, salt);

          case 5:
            hashedPass = _context2.sent;
            return _context2.abrupt("return", hashedPass);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function hashPass(_x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.hashPass = hashPass;