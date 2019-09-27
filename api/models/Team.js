import mongoose from 'mongoose';

const { Schema } = mongoose;

const teamSchema = new Schema({
  short_name: { type: String, unique: true },
  team_name: { type: String, unique: true },
  created_at: Date,
  updated_at: Date
});

const Team = mongoose.model('Team', teamSchema);

export default Team;
