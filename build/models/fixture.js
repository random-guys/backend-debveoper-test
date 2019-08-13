"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongodb = require("mongodb");

var _index = _interopRequireDefault(require("./Db/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */

/* eslint-disable no-console */

/* eslint-disable linebreak-style */
const fixtures = process.env.NODE_ENV === 'production' ? 'fixture' : 'testFixtures';

class FixtureModel {
  static findFixture(id) {
    return new Promise((resolve, reject) => {
      _index.default.then(client => {
        client.db().collection(fixtures).findOne({
          _id: new _mongodb.ObjectID(id)
        }).then(result => resolve(result)).catch(err => reject(err));
      }).catch(err => reject(err));
    });
  }

  static addFixture(homeTeam, awayTeam, dateTime, status) {
    return new Promise((resolve, reject) => {
      _index.default.then(client => {
        client.db().collection(fixtures).insertOne({
          homeTeam,
          awayTeam,
          dateTime: new Date(dateTime),
          status
        }).then(result => resolve(result.ops[0])).catch(err => reject(err));
      }).catch(err => reject(err));
    });
  }

  static removeFixture(id) {
    return new Promise((resolve, reject) => {
      _index.default.then(client => {
        client.db().collection(fixtures).findOneAndDelete({
          _id: new _mongodb.ObjectID(id)
        }).then(result => resolve(result.value)).catch(err => reject(err));
      }).catch(err => reject(err));
    });
  }

  static editFixture(id, whatToEdit, editPayload) {
    return new Promise((resolve, reject) => {
      const payload = whatToEdit === 'dateTime' ? new Date(editPayload) : editPayload;

      _index.default.then(client => {
        client.db().collection(fixtures).findOneAndUpdate({
          _id: new _mongodb.ObjectID(id)
        }, {
          $set: {
            [whatToEdit]: payload
          }
        }, {
          returnOriginal: false
        }).then(result => resolve(result.value)).catch(err => reject(err));
      }).catch(err => reject(err));
    });
  }

  static getAllFixtures(from, to) {
    return new Promise((resolve, reject) => {
      const query = from && to ? {
        dateTime: {
          $gte: new Date(from),
          $lte: new Date(to)
        }
      } : {};

      _index.default.then(client => {
        client.db().collection(fixtures).find(query).toArray((err, result) => {
          if (err) {
            return reject(err);
          }

          return resolve(result);
        });
      }).catch(err => reject(err));
    });
  }

  static getCompletedOrPendingFixtures(completedOrPending) {
    return new Promise((resolve, reject) => {
      _index.default.then(client => {
        client.db().collection(fixtures).find({
          status: completedOrPending
        }).toArray((err, result) => {
          if (err) {
            return reject(err);
          }

          return resolve(result);
        });
      }).catch(err => reject(err));
    });
  }

}

var _default = FixtureModel;
exports.default = _default;