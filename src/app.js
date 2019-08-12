/* eslint-disable linebreak-style */
import express from 'express';
import bodyParser from 'body-parser';
import authRoute from './routes/auth';
import teamRoute from './routes/team';
import fixtureRoute from './routes/fixture';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRoute);
app.use('/api/team', teamRoute);
app.use('/api/fixture', fixtureRoute);

export default app;
