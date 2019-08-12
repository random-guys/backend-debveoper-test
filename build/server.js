"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _mongodb = require("mongodb");

var _user = _interopRequireDefault(require("./routes/user"));

var _team = _interopRequireDefault(require("./routes/team"));

var _fixture = _interopRequireDefault(require("./routes/fixture"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable consistent-return */

/* eslint-disable no-console */
// routes import
// swagger import
_dotenv.default.config(); // setup express app


var app = (0, _express.default)(); // assign ports

var PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, function () {
    return console.log("App listening on port ".concat(PORT));
  });
} // bpdy parser to allow posting


app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
})); // allow for classic url encoding
// endpoint routers

app.use('/api/v1/auth', _user.default); // export the app

var _default = app;
exports.default = _default;