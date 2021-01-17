const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'Company',
  },
});

module.exports = mongoose.model('User', UserSchema);
