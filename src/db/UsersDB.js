/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
import client from './db';

// const db = client.db();
// const collection = db.collection('users');
console.log(`#1: ${process.env.NODE_ENV}`);
let NAME = process.env.NODE.ENV === 'production' ? 'users' : 'testcollection';
class User {
  static create(document) {
    return new Promise((resolve, reject) => {
      client
        .then((data) => {
          console.log(`#2: ${process.env.NODE_ENV}`);
          console.log(`#3: ${NAME}`);
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
        console.log(`#1: ${process.env.NODE_ENV}`);
          console.log(`#4: ${NAME}`);
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
export default User;
