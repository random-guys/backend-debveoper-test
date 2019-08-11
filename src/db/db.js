/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
import dotenv from 'dotenv';
import { MongoClient as mongo } from 'mongodb';


dotenv.config();
// eslint-disable-next-line consistent-return
export default new Promise(async (resolve, reject) => {
  mongo.connect(process.env.DATABASE_URL,
    { poolSize: 5, useNewUrlParser: true }, (err, client) => {
      // return resolve(client);
      if (err) reject(err);
      else return resolve(client.db('danielchima'));
    });
});
