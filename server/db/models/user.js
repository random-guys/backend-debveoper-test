const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  userName: String,
  email: String,
  password: String,
  role: Boolean,
});

module.exports = model('User', userSchema);
