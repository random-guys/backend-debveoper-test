/* eslint-disable linebreak-style */
import express from 'express';
import bodyParser from 'body-parser';
import authRoute from './routes/auth';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRoute);

export default app;
