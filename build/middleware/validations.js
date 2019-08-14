"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _response = _interopRequireDefault(require("../response"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const firstName = _joi.default.string().min(3).max(15).required();

const lastName = _joi.default.string().min(3).max(15).required();

const email = _joi.default.string().email().required();

const password = _joi.default.string().min(6).max(20).required();

const teamName = _joi.default.string().min(6).max(30).required();

const numOfPlayers = _joi.default.number().integer().min(1).max(50).required();

const id = _joi.default.string().min(6).max(30).required();

const dateTime = _joi.default.date().iso().required();

const status = _joi.default.string().valid('pending', 'completed').required();

const min_players = _joi.default.number().integer().min(1).max(50);

const max_players = _joi.default.number().integer().min(1).max(50);

const score = _joi.default.string().regex(/^\d+-\d+$/).required();

class Validations {
  static signUpValidation(req, res, next) {
    const schema = {
      firstName,
      lastName,
      email,
      password
    };

    const {
      error
    } = _joi.default.validate(_objectSpread({}, req.body), schema);

    if (error) {
      (0, _response.default)(res, 400, error);
    } else {
      next();
    }
  }

  static signInValidation(req, res, next) {
    const schema = {
      email,
      password
    };

    const {
      error
    } = _joi.default.validate(_objectSpread({}, req.body), schema);

    if (error) {
      (0, _response.default)(res, 400, error);
    } else {
      next();
    }
  }

  static addTeam(req, res, next) {
    const schema = {
      teamName,
      numOfPlayers
    };

    const {
      error
    } = _joi.default.validate(_objectSpread({}, req.body), schema);

    if (error) {
      (0, _response.default)(res, 400, error);
    } else {
      next();
    }
  }

  static removeTeam(req, res, next) {
    const schema = {
      teamName
    };

    const {
      error
    } = _joi.default.validate(_objectSpread({}, req.params), schema);

    if (error) {
      (0, _response.default)(res, 400, error);
    } else {
      next();
    }
  }

  static updatePlayers(req, res, next) {
    const schema = {
      teamName,
      numOfPlayers
    };

    const {
      error
    } = _joi.default.validate({
      teamName: req.params.teamName,
      numOfPlayers: req.body.numOfPlayers
    }, schema);

    if (error) {
      (0, _response.default)(res, 400, error);
    } else {
      next();
    }
  }

  static findTeam(req, res, next) {
    const schema = {
      teamName
    };

    const {
      error
    } = _joi.default.validate(_objectSpread({}, req.params), schema);

    if (error) {
      (0, _response.default)(res, 400, error);
    } else {
      next();
    }
  }

  static addFixture(req, res, next) {
    const schema = {
      homeTeam: teamName,
      awayTeam: teamName,
      dateTime
    };

    const {
      error
    } = _joi.default.validate(_objectSpread({}, req.body), schema);

    if (error) {
      (0, _response.default)(res, 400, error);
    } else {
      next();
    }
  }

  static removeFixture(req, res, next) {
    const schema = {
      fixtureId: id
    };

    const {
      error
    } = _joi.default.validate({
      fixtureId: req.params.fixtureId
    }, schema);

    if (error) {
      (0, _response.default)(res, 400, error);
    } else {
      next();
    }
  }

  static editFixture(req, res, next) {
    let schema;
    let validationObject;

    if (/dateTime/i.test(req.path)) {
      schema = {
        id,
        dateTime
      };
      validationObject = {
        id: req.params.fixtureId,
        dateTime: req.body.dateTime
      };
    } else if (/status/i.test(req.path)) {
      schema = {
        id,
        status
      };
      validationObject = {
        id: req.params.fixtureId,
        status: req.body.status
      };
    } else if (/score/i.test(req.path)) {
      schema = {
        score
      };
      validationObject = _objectSpread({}, req.body);
    }

    const {
      error
    } = _joi.default.validate(validationObject, schema);

    if (error) {
      (0, _response.default)(res, 400, error);
    } else {
      next();
    }
  }

  static getFixture(req, res, next) {
    const schema = {
      fixtureId: id
    };

    const {
      error
    } = _joi.default.validate({
      fixtureId: req.params.fixtureId
    }, schema);

    if (error) {
      (0, _response.default)(res, 400, error);
    } else {
      next();
    }
  }

  static publicTeamSearch(req, res, next) {
    const schema = {
      min_players,
      max_players
    };

    const {
      error
    } = _joi.default.validate(_objectSpread({}, req.query), schema);

    if (error) {
      (0, _response.default)(res, 400, error);
    } else {
      next();
    }
  }

  static publicFixtureSearch(req, res, next) {
    const schema = {
      from: _joi.default.date().iso(),
      to: _joi.default.date().iso()
    };

    const {
      error
    } = _joi.default.validate(_objectSpread({}, req.query), schema);

    if (error) {
      (0, _response.default)(res, 400, error);
    } else {
      next();
    }
  }

}

var _default = Validations;
exports.default = _default;