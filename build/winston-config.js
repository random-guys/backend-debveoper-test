"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _appRootPath = _interopRequireDefault(require("app-root-path"));

var _winston = _interopRequireDefault(require("winston"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable new-cap */

/* eslint-disable linebreak-style */
// https://www.digitalocean.com/community/tutorials/how-to-use-winston-to-log-node-js-applications
var options = {
  file: {
    level: 'info',
    filename: "".concat(_appRootPath.default, "/logs/app.log"),
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    // 5MB
    maxFiles: 5,
    colorize: false
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
  }
};
var logger = new _winston.default.createLogger({
  transports: [new _winston.default.transports.File(options.file), new _winston.default.transports.Console(options.console)],
  exitOnError: false
}); // create a stream object with a 'write' function that will be used by `morgan`

logger.stream = {
  // use the 'info' log level so the output will be picked up by both transports (file and console)
  write(message) {
    logger.info(message);
  }

};
var _default = logger;
exports.default = _default;