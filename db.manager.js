import mongoose from 'mongoose';
import keys from './src/utils/config';

class connectionManager {
  /**
   * Start the server and establish a connection
   */
  static async start() {
    await mongoose.connect(keys.mongoUri, {
      useNewUrlParser: true,
      useFindAndModify: false,
    })
      .then(() => console.log('MongoDB Connected...'))
      .catch(err => console.log(err));
  }

  static async stop() {
    await mongoose.connection.close(() => {
      console.log('Mongoose default connection closed');
    });
  }
}

export default connectionManager;
