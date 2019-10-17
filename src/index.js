import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import userRoute from './routes/user.route';
import teamRoute from './routes/team.route';
import fixtureRoute from './routes/fixture.route';
import connectionManager from '../db.manager';

const app = express();
const apiVersion = '/api/v1';

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
);
app.use(`${apiVersion}/users`, userRoute);
app.use(`${apiVersion}/teams`, teamRoute);
app.use(`${apiVersion}/fixtures`, fixtureRoute);

if (process.env.NODE_ENV === 'test') {
  connectionManager.stop();
} else {
  connectionManager.start();
}

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: 'Welcome to the Mock Premier League',
  });
});

app.use((err, req, res, next) => {
  if (err instanceof URIError) {
    return res.status(400).json({
      status: 400,
      error: `Failed to decode param: ${req.url}`,
    });
  }
  return next();
});
app.use('*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: 'url not found',
  });
});

export default app;
