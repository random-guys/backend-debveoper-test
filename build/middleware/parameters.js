"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
var params = {
  first_name: _joi.default.string().min(3).max(15).required(),
  last_name: _joi.default.string().min(3).max(15).required(),
  email: _joi.default.string().email().required(),
  password: _joi.default.string().min(6).max(20).required(),
  team_name: _joi.default.string().min(4).max(30).required(),
  team_size: _joi.default.number().integer().min(12).max(25)
};
var _default = params;
exports.default = _default;