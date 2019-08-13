"use strict";

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
const PORT = process.env.PORT || 5000;

_app.default.listen(PORT, () => {
  console.log("App listening on port ".concat(PORT));
});