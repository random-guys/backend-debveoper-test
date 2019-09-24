import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || 5000,
  mongoDB: process.env.MONGODB,
  jwtKey: process.env.JWTKEY,
  refreshJwtKey: process.env.REFRESHJWTKEY,
  jwtLife: process.env.JWTLIFE,
  refreshJwtLife: process.env.REFRESHJWTLIFE,
  isTest: process.env.NODE_ENV === 'test'
};
