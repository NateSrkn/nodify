"use strict";

var _index = require("./index");

var port = process.env.PORT || 3000;

var server = _index.app.listen(port, function () {
  console.log("Server is listening on ".concat(port));
});

module.exports = server;