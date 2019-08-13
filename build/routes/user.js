"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _User = _interopRequireDefault(require("../controllers/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.post('/signup', _User.default.signupCheck, _User.default.signup);
router.post('/signin', _User.default.signinCheck, _User.default.signin);
var _default = router;
exports.default = _default;