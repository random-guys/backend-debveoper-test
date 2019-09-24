const { Schema, model } = require('mongoose');

const teamSchema = new Schema({
  name: String,
});

module.exports = model('Team', teamSchema);
