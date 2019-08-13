"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("./Db/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const users = process.env.NODE_ENV === 'production' ? 'users' : 'testUsers';

class UserModel {
  static findUser(email) {
    return new Promise((resolve, reject) => {
      _index.default.then(client => {
        client.db().collection(users).findOne({
          email
        }).then(result => resolve(result)).catch(err => reject(err));
      }).catch(err => reject(err));
    });
  }

  static createUser(user) {
    return new Promise((resolve, reject) => {
      _index.default.then(client => {
        client.db().collection(users).insertOne(_objectSpread({}, user)).then(result => resolve(result.ops[0])).catch(err => reject(err));
      });
    });
  }

}

var _default = UserModel;
exports.default = _default;