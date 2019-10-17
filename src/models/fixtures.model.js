import mongoose from 'mongoose';

const { Schema } = mongoose;

const FixtureSchema = new Schema({
  team_A: {
    type: String,
    required: true,
  },
  team_B: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  scores: {
    type: String,
    required: false,
  },
});

const Fixture = mongoose.model('Fixture', FixtureSchema);
export default Fixture;
