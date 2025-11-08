const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bio: String,
  image: String,
  dob: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('UserProfile', userProfileSchema);