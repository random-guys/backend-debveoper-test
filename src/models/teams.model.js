import mongoose from 'mongoose';

const { Schema } = mongoose;

const TeamSchema = new Schema({
  team_name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  year_founded: {
    type: Date,
    required: true
  },
  stadium: {
    type: String,
    required: true
  },
  current_manager: {
    type: String,
    required: true
  },
  major_trophies: {
    type: String,
    required: true
  },
  motto: {
    type: String,
    required: true
  },
});

const Team = mongoose.model('Team', TeamSchema);
export default Team;
