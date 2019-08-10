/* eslint-disable no-console */

import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { MongoClient as mongo } from 'mongodb';
// swagger import

dotenv.config();
// setup express app
const app = express();
// assign ports
const PORT = process.env.PORT || 5000;
// bpdy parser to allow posting
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // allow for classic url encoding

// endpoint routers


// Not Found Handler
// app.use((req, res) => { res.status(404).send('Not Found!'); });

// open database from mongodby
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

// export the app
// export default app;
