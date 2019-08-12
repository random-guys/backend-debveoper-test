/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
import database from './Db/index';

const fixtures = process.env.NODE_ENV === 'production' ? 'fixture' : 'testFixtures';

class FixtureModel {
  static findFixture(fixtureId) {
    return new Promise((resolve, reject) => {
      database.then((client) => {
        client.db().collection(fixtures).findOne({ _id: fixtureId }).then((result) => resolve(result))
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
}

export default FixtureModel;
