/* eslint-disable no-console */
/* eslint-disable linebreak-style */
import dotenv from 'dotenv';
import { MongoClient as mongo } from 'mongodb';
import app from '../server';
// import EventEmitter from 'events';
/*
class Emitter extends EventEmitter {}
export const emitter = new Emitter();
*/

dotenv.config();
const PORT = process.env.PORT || 5000;
// eslint-disable-next-line consistent-return
export default new Promise(async (resolve, reject) => {
  const client = await mongo.connect(process.env.DATABASE_URL,
    { poolSize: 5, useNewUrlParser: true })
    .catch((err) => {
      console.log(`Error connecting to database: ${err}`);
      reject(err);
    });
    // check if client component is present
  if (client) {
    console.log('database connected');
    if (process.env.NODE_ENV !== 'test') {
      app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
    }
    return resolve(client.db());
    /*
    .then((client) => {
          resolve(client.db());
        })
     */
  }
});
