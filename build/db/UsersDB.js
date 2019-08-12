"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

var _db = _interopRequireDefault(require("./db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// const db = client.db();
// const collection = db.collection('users');
var NAME = process.env.NODE.ENV !== 'test' ? 'danielchima' : 'testbase';

var User =
/*#__PURE__*/
function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, null, [{
    key: "create",
    value: function create(document) {
      return new Promise(function (resolve, reject) {
        _db.default.then(function (data) {
          data.db(NAME).collection('users').insertOne(document).then(function (output) {
            resolve(output.ops[0]);
            console.log('user inserted succesfully');
          }).catch(function (err) {
            return reject(err);
          });
        });
      });
    }
  }, {
    key: "find",
    value: function find(email) {
      return new Promise(function (resolve, reject) {
        // wait for database to setup.
        _db.default.then(function (data) {
          // get value from database
          data.db(NAME).collection('users').findOne({
            email
          }).then(function (output) {
            // resolve data output
            resolve(output);
            console.log('user found');
          }).catch(function (err) {
            return reject(err);
          });
        });
      });
    }
  }]);

  return User;
}();

var _default = User;
exports.default = _default;