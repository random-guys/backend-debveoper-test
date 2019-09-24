import '@babel/polyfill';
import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import router from './server/routes/index';

const app = express();

mongoose.connection.once('open', () => {
  console.log('Database connected...');
});

mongoose.connection.on('error', () => {
  console.log('Database connection failed...');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(router);


const containerUri = process.env.DATABASE_URL;
   ( async function(){
    try {
      await mongoose.connect(containerUri, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (error) {
      console.log(error);
    }
   })();


app.get('/', (req, res) => {
  res.send(' Julius Welcome\'s you to Mock Premier League');
});

app.use('*', (req, res) => res.status(404).json({
  status: '404',
  message: 'route not found',
}));

const port = process.env.PORT || 9090;

app.listen(port, () => { console.log(`Listening on port ${port}`); });

export default app;
