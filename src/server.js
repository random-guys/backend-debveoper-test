/* eslint-disable consistent-return */
/* eslint-disable no-console */

import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { MongoClient as mongo } from 'mongodb';
// routes import
import userRouter from './routes/user';
import teamRouter from './routes/team';
import fixtureRouter from './routes/fixture';
// swagger import

dotenv.config();
// setup express app
const app = express();
// assign ports
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
}
// bpdy parser to allow posting
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // allow for classic url encoding

// endpoint routers
app.use('/api/v1/auth', userRouter);
app.use('/api/v1/teams', teamRouter);
app.use('/api/v1/fixtures', fixtureRouter);

// export the app
export default app;
