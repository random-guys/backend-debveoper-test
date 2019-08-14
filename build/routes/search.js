"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _User = _interopRequireDefault(require("../controllers/User"));

var _Team = _interopRequireDefault(require("../controllers/Team"));

var _Fixture = _interopRequireDefault(require("../controllers/Fixture"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.get('/view/:name', _Team.default.paramChecker, _Team.default.viewOne);
router.get('/:status', _Fixture.default.statusChecker, _Fixture.default.filter);
var _default = router;
exports.default = _default;