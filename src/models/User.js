/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
import database from './Db/index';

const users = process.env.NODE_ENV === 'production' ? 'users' : 'testUsers';

class UserModel {
  static findUser(email) {
    return new Promise((resolve, reject) => {
      database.then((client) => {
        client.db().collection(users).findOne({ email }).then((result) => resolve(result))
          .catch((err) => reject(err));
      }).catch((err) => reject(err));
    });
  }

  static createUser(user) {
    return new Promise((resolve, reject) => {
      database.then((client) => {
        client.db().collection(users).insertOne({ ...user }).then((result) => resolve(result.ops[0]))
          .catch((err) => reject(err));
      });
    });
  }

  static isAdmin(userId) {
  }
}

export default UserModel;
