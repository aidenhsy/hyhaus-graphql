const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'User',
    },
  ],
});

module.exports = mongoose.model('Company', CompanySchema);
