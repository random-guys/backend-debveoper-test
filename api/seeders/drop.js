import mongoose from 'mongoose';
import config from '../config/config';

const { mongoDB } = config;

const drop = async (collection) => {
  const db = await mongoose.connect(mongoDB,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }, async () => {
      await mongoose.connection.db.dropCollection(collection);
      // eslint-disable-next-line no-console
      console.log(`${collection} collection successfully dropped`);
    });
  return db;
};

export default drop;
