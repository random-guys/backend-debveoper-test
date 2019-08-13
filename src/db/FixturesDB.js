/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
import { ObjectID as ID } from 'mongodb';
import client from './db';

const NAME = process.env.NODE_ENV !== 'testing' ? 'fixtures' : 'testcollection';

class FixturesDB {
  static add(document) {
    return new Promise((resolve, reject) => {
      client
        .then((data) => {
          data.db('danielchima').collection(NAME).insertOne(document)
            .then((output) => {
              resolve(output.ops[0]);
              console.log('fixture inserted succesfully');
            })
            .catch(err => reject(err));
        });
    });
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      // wait for database to setup.
      client
        .then((data) => {
          // get value from database
          data.db('danielchima').collection(NAME)
            .findOne({ _id: ID(id) })
            .then((output) => {
              // resolve data output
              resolve(output);
              console.log('fixture found');
            })
            .catch(err => reject(err));
        });
    });
  }

  static filter(status) {
    return new Promise((resolve, reject) => {
      client
        .then((data) => {
          data.db('danielchima').collection(NAME).find({ status })
            .toArray((err, output) => {
              if (err) return reject(err);
              return resolve(output);
            });
        }).catch(err => reject(err));
    });
  }

  static all() {
    return new Promise((resolve, reject) => {
      client
        .then((data) => {
          data.db('danielchima').collection(NAME).find({})
            .toArray((err, output) => {
              if (err) return reject(err);
              return resolve(output);
            });
        }).catch(err => reject(err));
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      client
        .then((data) => {
          data.db('danielchima').collection(NAME)
            .findOneAndDelete({ _id: ID(id) })
            .then((output) => {
              resolve(output);
              console.log('fixture deleted');
            })
            .catch(err => reject(err));
        });
    });
  }

  static change(id, document) {
    const update = {
      $set: document,
    };
    return new Promise((resolve, reject) => {
      client
        .then((data) => {
          data.db('danielchima').collection(NAME)
            .findOneAndUpdate({ _id: ID(id) }, update)
            .then((output) => {
              resolve(output);
              console.log('fixture updated successfully');
            })
            .catch(err => reject(err));
        });
    });
  }
}

export default FixturesDB;
