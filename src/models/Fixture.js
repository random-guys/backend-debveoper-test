/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
import { ObjectID } from 'mongodb';
import database from './Db/index';

const fixtures = process.env.NODE_ENV === 'production' ? 'fixture' : 'testFixtures';

class FixtureModel {
  static findFixture(id) {
    return new Promise((resolve, reject) => {
      database.then((client) => {
        client.db().collection(fixtures).findOne({ _id: new ObjectID(id) }).then((result) => resolve(result))
          .catch((err) => reject(err));
      }).catch((err) => reject(err));
    });
  }

  static addFixture(homeTeam, awayTeam, dateTime, status) {
    return new Promise((resolve, reject) => {
      database.then((client) => {
        client.db().collection(fixtures)
          .insertOne({
            homeTeam, awayTeam, dateTime: new Date(dateTime), status,
          })
          .then((result) => resolve(result.ops[0]))
          .catch((err) => reject(err));
      }).catch((err) => reject(err));
    });
  }

  static removeFixture(id) {
    return new Promise((resolve, reject) => {
      database.then((client) => {
        client.db().collection(fixtures)
          .findOneAndDelete({ _id: new ObjectID(id) }).then((result) => resolve(result.value))
          .catch((err) => reject(err));
      }).catch((err) => reject(err));
    });
  }

  static editFixture(id, whatToEdit, editPayload) {
    return new Promise((resolve, reject) => {
      const payload = whatToEdit === 'dateTime' ? new Date(editPayload) : editPayload;
      database.then((client) => {
        client.db().collection(fixtures)
          .findOneAndUpdate(
            { _id: new ObjectID(id) },
            { $set: { [whatToEdit]: payload } },
            { returnOriginal: false },
          ).then((result) => resolve(result.value))
          .catch((err) => reject(err));
      }).catch((err) => reject(err));
    });
  }

  static getAllFixtures(from, to) {
    return new Promise((resolve, reject) => {
      const query = (from && to) ? { dateTime: { $gte: new Date(from), $lte: new Date(to) } } : {};
      database.then((client) => {
        client.db().collection(fixtures).find(query)
          .toArray((err, result) => {
            if (err) {
              return reject(err);
            }
            return resolve(result);
          });
      }).catch((err) => reject(err));
    });
  }

  static getCompletedOrPendingFixtures(completedOrPending) {
    return new Promise((resolve, reject) => {
      database.then((client) => {
        client.db().collection(fixtures).find({ status: completedOrPending })
          .toArray((err, result) => {
            if (err) {
              return reject(err);
            }
            return resolve(result);
          });
      }).catch((err) => reject(err));
    });
  }
}

export default FixtureModel;
