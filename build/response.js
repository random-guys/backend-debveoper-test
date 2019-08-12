"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var response = function response(responseObject, data, code) {
  var res = responseObject;

  if (code >= 400) {
    // data will be an error
    return res.status(code).json({
      status: code,
      error: "".concat(data),
      success: false
    });
  }

  return res.status(code).json({
    // return data
    status: code,
    data,
    success: true
  });
};

var _default = response;
exports.default = _default;