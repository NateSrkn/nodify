"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _user = require("./routes/user");

var _auth = require("./routes/auth");

var _topics = require("./routes/topics");

_dotenv["default"].config();

var app = (0, _express["default"])(); // Middleware

exports.app = app;
app.use((0, _cors["default"])({
  credentials: true,
  origin: true
}));
app.options('*', (0, _cors["default"])());
app.use(_express["default"].json()); // Routes

app.use('/api/users', _user.usersRoute);
app.use('/api/auth', _auth.authRoute);
app.use('/api/topics', _topics.topicsRoute);
app.use('/', function (req, res) {
  res.json({
    message: 'uh!'
  });
});
var mongo = process.env.NODE_ENV === 'test' ? process.env.TEST_DB_CONNECT : process.env.DB_CONNECT;

_mongoose["default"].connect(mongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

_mongoose["default"].Promise = global.Promise;

_mongoose["default"].connection.on('error', console.error.bind(console, 'MongoDB Connection Error...'));