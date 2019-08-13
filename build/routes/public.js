"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _fixture = _interopRequireDefault(require("../controllers/fixture"));

var _team = _interopRequireDefault(require("../controllers/team"));

var _validations = _interopRequireDefault(require("../middleware/validations"));

var _authentication = _interopRequireDefault(require("../middleware/authentication"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
const router = _express.default.Router(); // team?min_players&max_players


router.get('/team', _authentication.default.verifyToken, _validations.default.publicTeamSearch, _team.default.publicTeamSearch);
router.get('/team/:teamName', _authentication.default.verifyToken, _validations.default.findTeam, _team.default.findTeam); // fixture?from=YYYY-MM-DD+00:00&to=YYYY-MM-DD+00:00

router.get('/fixture', _authentication.default.verifyToken, _validations.default.publicFixtureSearch, _fixture.default.publicFixtureSearch);
router.get('/fixture/completed', _authentication.default.verifyToken, _fixture.default.getCompletedOrPendingFixtures);
router.get('/fixture/pending', _authentication.default.verifyToken, _fixture.default.getCompletedOrPendingFixtures);
var _default = router;
exports.default = _default;