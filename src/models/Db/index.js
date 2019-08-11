/* eslint-disable linebreak-style */
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

export default new Promise((resolve, reject) => {
  MongoClient.connect(process.env.DATABASE_URI, { poolSize: 5, useNewUrlParser: true }, (err, client) => {
    if (err) {
      return reject(err);
    }
    return resolve(client);
  });
});
