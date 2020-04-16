"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authRoute = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _User = _interopRequireDefault(require("../models/User"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _validation = require("../helpers/validation");

var router = _express["default"].Router();

exports.authRoute = router;
router.post('/', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _loginValidation, error, user, validPass, token;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _loginValidation = (0, _validation.loginValidation)(req.body), error = _loginValidation.error;

            if (!error) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              error: error.details[0].message
            }));

          case 3:
            _context.next = 5;
            return _User["default"].findOne({
              email: req.body.email
            });

          case 5:
            user = _context.sent;

            if (!user) {
              _context.next = 12;
              break;
            }

            _context.next = 9;
            return _bcryptjs["default"].compare(req.body.password, user.password);

          case 9:
            _context.t0 = _context.sent;
            _context.next = 13;
            break;

          case 12:
            _context.t0 = null;

          case 13:
            validPass = _context.t0;

            if (!(!validPass || !user)) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              error: 'Username or password is incorrect'
            }));

          case 16:
            token = _jsonwebtoken["default"].sign({
              id: user.id,
              name: user.name,
              username: user.username,
              issuer: 'https://www.nathansorkin.com'
            }, process.env.JWT_SECRET, {
              expiresIn: '2h'
            });
            res.status(200).json({
              success: true,
              message: 'Authentication successful.',
              token: token
            });

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());