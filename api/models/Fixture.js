import mongoose from 'mongoose';

const { Schema } = mongoose;

const fixtureSchema = new Schema({
  home: { type: String, required: true },
  away: { type: String, required: true },
  fixture: String,
  fixture_link: String,
  match_date: String,
  created_at: Date,
  updated_at: Date
});

const Fixture = mongoose.model('Fixture', fixtureSchema);

export default Fixture;
