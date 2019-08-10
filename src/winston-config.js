/* eslint-disable new-cap */
/* eslint-disable linebreak-style */
// https://www.digitalocean.com/community/tutorials/how-to-use-winston-to-log-node-js-applications
import appRoot from 'app-root-path';
import winston from 'winston';

const options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logger = new winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false,
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
// use the 'info' log level so the output will be picked up by both transports (file and console)
  write(message) {
    logger.info(message);
  },
};

export default logger;
