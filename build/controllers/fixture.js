"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fixture = _interopRequireDefault(require("../models/fixture"));

var _team = _interopRequireDefault(require("../models/team"));

var _response = _interopRequireDefault(require("../response"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
class FixtureController {
  static async addFixture(req, res) {
    try {
      const homeTeam = req.body.homeTeam.toLowerCase();
      const awayTeam = req.body.awayTeam.toLowerCase();
      const {
        dateTime,
        time
      } = req.body; // Determine if the home and away teams exist

      const homeTeamExists = await _team.default.findTeam(homeTeam);
      const awayTeamExists = await _team.default.findTeam(awayTeam);

      if (homeTeamExists && awayTeamExists) {
        if (homeTeam !== awayTeam) {
          // Create fixture
          const newFixture = await _fixture.default.addFixture(homeTeam, awayTeam, dateTime, 'pending');
          (0, _response.default)(res, 201, newFixture);
        } else {
          (0, _response.default)(res, 400, 'You cant choose the same team for home and away');
        }
      } else {
        (0, _response.default)(res, 400, "The team ".concat(homeTeamExists ? awayTeam : homeTeam, " does not exist"));
      }
    } catch (error) {
      (0, _response.default)(res, 500, error);
    }
  }

  static async removeFixture(req, res) {
    try {
      // Determine if the fixture exists;
      const {
        fixtureId
      } = req.params;
      const fixtureExists = await _fixture.default.findFixture(fixtureId);

      if (fixtureExists) {
        const deletedFixture = await _fixture.default.removeFixture(fixtureId);
        (0, _response.default)(res, 200, deletedFixture);
      } else {
        (0, _response.default)(res, 400, 'The fixture is not on record');
      }
    } catch (error) {
      (0, _response.default)(res, 500, error);
    }
  }

  static async editFixture(req, res) {
    const {
      fixtureId
    } = req.params;

    try {
      // Determine if the fixture exists
      const fixtureExists = await _fixture.default.findFixture(fixtureId);

      if (fixtureExists) {
        let whatToEdit;
        let editPayload;

        if (/dateTime/i.test(req.path)) {
          whatToEdit = 'dateTime';
          editPayload = req.body.dateTime;
        } else if (/status/i.test(req.path)) {
          whatToEdit = 'status';
          editPayload = req.body.status;
        }

        const editedFixture = await _fixture.default.editFixture(fixtureId, whatToEdit, editPayload);
        (0, _response.default)(res, 200, editedFixture);
      } else {
        (0, _response.default)(res, 400, 'The fixture does not exist');
      }
    } catch (error) {
      (0, _response.default)(res, 500, error);
    }
  }

  static async getAllFixtures(req, res) {
    try {
      const fixtures = await _fixture.default.getAllFixtures();
      (0, _response.default)(res, 200, fixtures);
    } catch (error) {
      (0, _response.default)(res, 500, error);
    }
  }

  static async getFixture(req, res) {
    const {
      fixtureId
    } = req.params;

    try {
      const fixture = await _fixture.default.findFixture(fixtureId);

      if (fixture) {
        (0, _response.default)(res, 200, fixture);
      } else {
        (0, _response.default)(res, 400, 'Fixture does not exist');
      }
    } catch (error) {
      (0, _response.default)(res, 500, error);
    }
  }

  static async getCompletedOrPendingFixtures(req, res) {
    try {
      const completedOrPending = /completed/i.test(req.path) ? 'completed' : 'pending';
      const fixtures = await _fixture.default.getCompletedOrPendingFixtures(completedOrPending);
      (0, _response.default)(res, 200, fixtures);
    } catch (error) {
      (0, _response.default)(res, 500, error);
    }
  }

  static async publicFixtureSearch(req, res) {
    try {
      if (req.query.from && req.query.to) {
        const fixtures = await _fixture.default.getAllFixtures(req.query.from, req.query.to);
        (0, _response.default)(res, 200, fixtures);
      } else {
        FixtureController.getAllFixtures(req, res);
      }
    } catch (error) {
      (0, _response.default)(res, 500, error);
    }
  }

}

var _default = FixtureController;
exports.default = _default;