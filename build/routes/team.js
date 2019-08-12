"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _User = _interopRequireDefault(require("../controllers/User"));

var _Team = _interopRequireDefault(require("../controllers/Team"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.post('/', _Team.default.addChecker, _User.default.checkToken, _Team.default.add);
router.get('/', _Team.default.nameChecker, _User.default.checkToken, _Team.default.viewOne);
router.get('/all', _User.default.checkToken, _Team.default.viewAll);
router.delete('/', _Team.default.nameChecker, _User.default.checkToken, _Team.default.delete); // view get
// change patch
// delete

var _default = router;
exports.default = _default;