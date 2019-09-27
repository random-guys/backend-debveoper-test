import mongoose from 'mongoose';
import config from '../config/config';
import userSeed from './users.seeder';
import teamSeed from './teams.seeder';

const { mongoDB } = config;

const runSeeders = async () => {
  const db = await mongoose.connect(mongoDB,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }, async () => {
      await mongoose.connection.db.dropDatabase();
      // eslint-disable-next-line no-console
      console.log('Database successfully dropped');
    });

  await userSeed();
  await teamSeed();

  setTimeout(() => {
    db.disconnect();
  }, 5000);
};

runSeeders();
