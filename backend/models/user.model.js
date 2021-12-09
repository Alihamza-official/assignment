
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema, 'User');

module.exports = User;
