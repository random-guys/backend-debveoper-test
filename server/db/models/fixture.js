const { Schema, model } = require('mongoose');

const fixtureSchema = new Schema({
  hostTeamId: Number,
  awayTeamId: Number,
  matchDate: Date,
});

module.exports = model('Fixture', fixtureSchema);
