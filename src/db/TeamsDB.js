/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
import client from './db';

const NAME = process.env.NODE_ENV !== 'testing' ? 'teams' : 'test2';

class TeamsDB {
  static add(document) {
    return new Promise((resolve, reject) => {
      client
        .then((data) => {
          data.db('danielchima').collection(NAME).insertOne(document)
            .then((output) => {
              resolve(output.ops[0]);
              console.log('team inserted succesfully');
            })
            .catch(err => reject(err));
        });
    });
  }

  static find(team_name) {
    return new Promise((resolve, reject) => {
      // wait for database to setup.
      client
        .then((data) => {
        // get value from database
          data.db('danielchima').collection(NAME).findOne({ team_name })
            .then((output) => {
              // resolve data output
              resolve(output);
              console.log('team found');
            })
            .catch(err => reject(err));
        });
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

  static delete(team_name) {
    return new Promise((resolve, reject) => {
      client
        .then((data) => {
          data.db('danielchima').collection(NAME)
            .findOneAndDelete({ team_name })
            .then((output) => {
              resolve(output);
              console.log('team deleted');
            })
            .catch(err => reject(err));
        });
    });
  }

  static change(team_name, new_name) {
    const update = {
      $set: { team_name: new_name },
    };
    return new Promise((resolve, reject) =>{
      client
        .then((data) => {
          data.db('danielchima').collection(NAME)
            .findOneAndUpdate({ team_name }, update)
            .then((output) => {
              resolve(output);
              console.log('team updated');
            })
            .catch(err => reject(err));
        });
    });
  }
}

export default TeamsDB;
