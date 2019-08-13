"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _team = _interopRequireDefault(require("../controllers/team"));

var _validations = _interopRequireDefault(require("../middleware/validations"));

var _authentication = _interopRequireDefault(require("../middleware/authentication"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
const router = _express.default.Router();

router.route('/').post(_authentication.default.adminVerifyToken, _validations.default.addTeam, _team.default.addTeam).get(_authentication.default.adminVerifyToken, _team.default.getTeams);
router.route('/:teamName').get(_authentication.default.adminVerifyToken, _validations.default.findTeam, _team.default.findTeam).delete(_authentication.default.adminVerifyToken, _validations.default.removeTeam, _team.default.removeTeam);
router.patch('/:teamName/players', _authentication.default.adminVerifyToken, _validations.default.updatePlayers, _team.default.updatePlayers);
var _default = router;
exports.default = _default;