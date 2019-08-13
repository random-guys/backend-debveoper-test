"use strict";

var _server = _interopRequireDefault(require("./server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'testing') {
  _server.default.listen(PORT, function () {
    return console.log("App listening on port ".concat(PORT));
  });
}