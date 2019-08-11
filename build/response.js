"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable linebreak-style */
const response = (responseObject, statusCode, dataOrError) => {
  const res = responseObject;
  let x = 'data';
  let success = true;
  let payload = dataOrError;

  if (statusCode >= 400) {
    x = 'error';
    success = false;
    payload = "".concat(payload);
  }

  return res.status(statusCode).json({
    status: statusCode,
    [x]: payload,
    success
  });
};

var _default = response;
exports.default = _default;