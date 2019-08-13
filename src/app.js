/* eslint-disable linebreak-style */
import express from 'express';
import bodyParser from 'body-parser';
import authRoute from './routes/auth';
import teamRoute from './routes/team';
import fixtureRoute from './routes/fixture';
import publicRoute from './routes/public';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/admin/team', teamRoute);
app.use('/api/v1/admin/fixture', fixtureRoute);
app.use('/api/v1/public', publicRoute);

export default app;
