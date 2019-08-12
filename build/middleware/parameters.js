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
  password: _joi.default.string().min(6).max(20).required()
};
var _default = params;
exports.default = _default;