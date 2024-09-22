const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String }, // For JWT users
  first_name: { type: String }, // For manual sign-up users
  last_name: { type: String },  // For manual sign-up users
  displayName: { type: String }, // For Google users
  photoURL: { type: String }, // For Google users
  firebaseUID: { type: String }, // For Google users
});

module.exports = mongoose.model('User', userSchema);
