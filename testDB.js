import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

// May require additional time for downloading MongoDB binaries
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

class TestDbHelper {
  constructor() {
    this.db = null;
    this.server = new MongoMemoryServer();
    this.connection = null;
  }

  /**
   * Start the server and establish a connection
   */
  async start() {
    const mongoUri = await this.server.getConnectionString();
    this.connection = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useFindAndModify: false,
    });
  }

  async stop() {
    await this.connection.disconnect();
    return this.server.stop();
  }
}

export default TestDbHelper;
