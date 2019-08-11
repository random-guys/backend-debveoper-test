"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _mongodb = require("mongodb");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
_dotenv.default.config();

var _default = new Promise((resolve, reject) => {
  _mongodb.MongoClient.connect(process.env.DATABASE_URI, {
    poolSize: 5,
    useNewUrlParser: true
  }, (err, client) => {
    if (err) {
      return reject(err);
    }

    return resolve(client);
  });
});

exports.default = _default;