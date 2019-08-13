/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
import client from './db';

// const db = client.db();
// const collection = db.collection('users');
const NAME = process.env.NODE_ENV !== 'testing' ? 'users' : 'test1';
class UsersDB {
  static create(document) {
    return new Promise((resolve, reject) => {
      client
        .then((data) => {
          data.db('danielchima').collection(NAME).insertOne(document)
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
          data.db('danielchima').collection(NAME).findOne({ email })
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
export default UsersDB;

/* 
  static admin(email) {
    return new Promise((resolve, reject) => {
      // wait for database to setup.
      client
        .then((data) => {
        // get value from database
          data.db('danielchima').collection(NAME).find({ email }, { admin: 1, _id: 0 })
            .toArray((err, output) => {
              if (err) { return reject(err); }
              console.log(`#3: ${output}`);
              return resolve(output);
            });
        }).catch(err => reject(err));
    });
  }
}
*/