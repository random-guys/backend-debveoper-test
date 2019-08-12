/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
import client from './db';

// const db = client.db();
// const collection = db.collection('users');

const NAME = process.env.NODE.ENV !== 'testing' ? 'danielchima' : 'testbase';
class User {
  static create(document) {
    return new Promise((resolve, reject) => {
      client
        .then((data) => {
          data.db(NAME).collection('users').insertOne(document)
            .then((output) => {
              resolve(output.ops[0]);
              console.log('user inserted succesfully');
            })
            .catch(err => reject(err));
        });
    });
  }

  static find(email) {
    return new Promise((resolve, reject) => {
      // wait for database to setup.
      client
        .then((data) => {
        // get value from database
          data.db(NAME).collection('users').findOne({ email })
            .then((output) => {
              // resolve data output
              resolve(output);
              console.log('user found');
            })
            .catch(err => reject(err));
        });
    });
  }
}
export default User;
