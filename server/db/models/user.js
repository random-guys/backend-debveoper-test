const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  userName: String,
  email: String,
  password: String,
  isAdmin: Boolean,
});

module.exports = model('User', userSchema);
