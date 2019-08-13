"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _auth = _interopRequireDefault(require("./routes/auth"));

var _team = _interopRequireDefault(require("./routes/team"));

var _fixture = _interopRequireDefault(require("./routes/fixture"));

var _public = _interopRequireDefault(require("./routes/public"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
const app = (0, _express.default)();
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use('/api/v1/auth', _auth.default);
app.use('/api/v1/admin/team', _team.default);
app.use('/api/v1/admin/fixture', _fixture.default);
app.use('/api/v1/public', _public.default);
var _default = app;
exports.default = _default;