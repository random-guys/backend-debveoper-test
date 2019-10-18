import { config } from 'dotenv';

config();

const keys = {
  port: process.env.PORT,
  secret: process.env.SECRET,
  mongoUri: process.env.MONGODB_URI,
};
export default keys;
