import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());

// Normal express config defaults
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'API is ready',
  });
});

// catch 404 and forward to error handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Route Not Found',
  });
});

const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${server.address().port}`);
});

export default server;
