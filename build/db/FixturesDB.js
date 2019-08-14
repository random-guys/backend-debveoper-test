"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

var _mongodb = require("mongodb");

var _db = _interopRequireDefault(require("./db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var NAME = process.env.NODE_ENV !== 'testing' ? 'fixtures' : 'test3';

var FixturesDB =
/*#__PURE__*/
function () {
  function FixturesDB() {
    _classCallCheck(this, FixturesDB);
  }

  _createClass(FixturesDB, null, [{
    key: "add",
    value: function add(document) {
      return new Promise(function (resolve, reject) {
        _db.default.then(function (data) {
          data.db('danielchima').collection(NAME).insertOne(document).then(function (output) {
            resolve(output.ops[0]);
            console.log('fixture inserted succesfully');
          }).catch(function (err) {
            return reject(err);
          });
        });
      });
    }
  }, {
    key: "find",
    value: function find(id) {
      return new Promise(function (resolve, reject) {
        // wait for database to setup.
        _db.default.then(function (data) {
          // get value from database
          data.db('danielchima').collection(NAME).findOne({
            _id: (0, _mongodb.ObjectID)(id)
          }).then(function (output) {
            // resolve data output
            resolve(output);
            console.log('fixture found');
          }).catch(function (err) {
            return reject(err);
          });
        });
      });
    }
  }, {
    key: "filter",
    value: function filter(status) {
      return new Promise(function (resolve, reject) {
        _db.default.then(function (data) {
          data.db('danielchima').collection(NAME).find({
            status
          }).toArray(function (err, output) {
            if (err) return reject(err);
            return resolve(output);
          });
        }).catch(function (err) {
          return reject(err);
        });
      });
    }
  }, {
    key: "all",
    value: function all() {
      return new Promise(function (resolve, reject) {
        _db.default.then(function (data) {
          data.db('danielchima').collection(NAME).find({}).toArray(function (err, output) {
            if (err) return reject(err);
            return resolve(output);
          });
        }).catch(function (err) {
          return reject(err);
        });
      });
    }
  }, {
    key: "delete",
    value: function _delete(id) {
      return new Promise(function (resolve, reject) {
        _db.default.then(function (data) {
          data.db('danielchima').collection(NAME).findOneAndDelete({
            _id: (0, _mongodb.ObjectID)(id)
          }).then(function (output) {
            resolve(output);
            console.log('fixture deleted');
          }).catch(function (err) {
            return reject(err);
          });
        });
      });
    }
  }, {
    key: "change",
    value: function change(id, document) {
      var update = {
        $set: document
      };
      return new Promise(function (resolve, reject) {
        _db.default.then(function (data) {
          data.db('danielchima').collection(NAME).findOneAndUpdate({
            _id: (0, _mongodb.ObjectID)(id)
          }, update).then(function (output) {
            resolve(output);
            console.log('fixture updated successfully');
          }).catch(function (err) {
            return reject(err);
          });
        });
      });
    }
  }]);

  return FixturesDB;
}();

var _default = FixturesDB;
exports.default = _default;