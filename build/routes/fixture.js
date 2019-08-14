"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _User = _interopRequireDefault(require("../controllers/User"));

var _Fixture = _interopRequireDefault(require("../controllers/Fixture"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.post('/', _Fixture.default.addChecker, _User.default.checkToken, _Fixture.default.add);
router.get('/view', _Fixture.default.idChecker, _User.default.checkToken, _Fixture.default.viewOne);
router.get('/all', _User.default.checkToken, _Fixture.default.viewAll);
router.get('/:status', _Fixture.default.statusChecker, _User.default.checkToken, _Fixture.default.filter);
router.delete('/', _Fixture.default.idChecker, _User.default.checkToken, _Fixture.default.delete);
router.patch('/:id', _Fixture.default.paramChecker, _Fixture.default.addChecker, _User.default.checkToken, _Fixture.default.change); // view get
// change patch
// delete

var _default = router;
exports.default = _default;