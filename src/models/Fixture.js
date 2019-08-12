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

  static addFixture(homeTeam, awayTeam, date, time, status) {
    return new Promise((resolve, reject) => {
      database.then((client) => {
        client.db().collection(fixtures)
          .insertOne({
            homeTeam, awayTeam, date, time, status,
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
      database.then((client) => {
        client.db().collection(fixtures)
          .findOneAndUpdate(
            { _id: new ObjectID(id) },
            { $set: { [whatToEdit]: editPayload } },
            { returnOriginal: false },
          ).then((result) => resolve(result.value))
          .catch((err) => reject(err));
      }).catch((err) => reject(err));
    });
  }
}

export default FixtureModel;
