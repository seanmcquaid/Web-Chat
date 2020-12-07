const mongoose = require('mongoose');

const User = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isTyping: {
    type: Boolean,
    required: true,
  },
  isOnline: {
    type: Boolean,
    required: true,
  },
  friends: [
    {
      type: String,
      required: true,
    },
  ],
  messages: [
    {
      message: {
        type: String,
        required: true,
      },
      sentTo: {
        type: String,
        required: true,
      },
      sentFrom: {
        type: String,
        required: true,
      },
      time: {
        type: Date,
        required: true,
      },
    },
  ],
});

module.exports = User;
