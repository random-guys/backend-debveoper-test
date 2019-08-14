"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _fixture = _interopRequireDefault(require("../controllers/fixture"));

var _validations = _interopRequireDefault(require("../middleware/validations"));

var _authentication = _interopRequireDefault(require("../middleware/authentication"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
const router = _express.default.Router();

router.route('/').post(_authentication.default.adminVerifyToken, _validations.default.addFixture, _fixture.default.addFixture).get(_authentication.default.adminVerifyToken, _fixture.default.getAllFixtures);
router.route('/:fixtureId').delete(_authentication.default.adminVerifyToken, _validations.default.removeFixture, _fixture.default.removeFixture).get(_authentication.default.adminVerifyToken, _validations.default.getFixture, _fixture.default.getFixture);
router.patch('/:fixtureId/dateTime', _authentication.default.adminVerifyToken, _validations.default.editFixture, _fixture.default.editFixture);
router.patch('/:fixtureId/status', _authentication.default.adminVerifyToken, _validations.default.editFixture, _fixture.default.editFixture);
router.patch('/:fixtureId/score', _authentication.default.adminVerifyToken, _validations.default.editFixture, _fixture.default.editFixture);
var _default = router;
exports.default = _default;