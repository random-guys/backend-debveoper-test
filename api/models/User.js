import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: Date,
  updated_at: Date
});

const User = mongoose.model('User', userSchema);

export default User;
