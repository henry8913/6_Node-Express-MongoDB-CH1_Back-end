
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = +process.env.SALT_ROUNDS;

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Optional now since Google users won't have password
  name: { type: String, required: true },
  googleId: { type: String }, // Add Google ID field
  avatar: { type: String } // Optional Google profile picture
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password') && this.password) {
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
