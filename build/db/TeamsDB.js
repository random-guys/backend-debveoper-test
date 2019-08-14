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

var NAME = process.env.NODE_ENV !== 'testing' ? 'teams' : 'test2';

var TeamsDB =
/*#__PURE__*/
function () {
  function TeamsDB() {
    _classCallCheck(this, TeamsDB);
  }

  _createClass(TeamsDB, null, [{
    key: "add",
    value: function add(document) {
      return new Promise(function (resolve, reject) {
        _db.default.then(function (data) {
          data.db('danielchima').collection(NAME).insertOne(document).then(function (output) {
            resolve(output.ops[0]);
            console.log('team inserted succesfully');
          }).catch(function (err) {
            return reject(err);
          });
        });
      });
    }
  }, {
    key: "find",
    value: function find(team_name) {
      return new Promise(function (resolve, reject) {
        // wait for database to setup.
        _db.default.then(function (data) {
          // get value from database
          data.db('danielchima').collection(NAME).findOne({
            team_name
          }).then(function (output) {
            // resolve data output
            resolve(output);
            console.log('team found');
          }).catch(function (err) {
            return reject(err);
          });
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
    value: function _delete(team_name) {
      return new Promise(function (resolve, reject) {
        _db.default.then(function (data) {
          data.db('danielchima').collection(NAME).findOneAndDelete({
            team_name
          }).then(function (output) {
            resolve(output);
            console.log('team deleted');
          }).catch(function (err) {
            return reject(err);
          });
        });
      });
    }
  }, {
    key: "change",
    value: function change(team_name, new_name) {
      var update = {
        $set: {
          team_name: new_name
        }
      };
      return new Promise(function (resolve, reject) {
        _db.default.then(function (data) {
          data.db('danielchima').collection(NAME).findOneAndUpdate({
            team_name
          }, update).then(function (output) {
            resolve(output);
            console.log('team updated');
          }).catch(function (err) {
            return reject(err);
          });
        });
      });
    }
  }]);

  return TeamsDB;
}();

var _default = TeamsDB;
exports.default = _default;