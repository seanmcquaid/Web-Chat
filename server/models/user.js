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
    default: false,
  },
  isOnline: {
    type: Boolean,
    default: true,
  },
  friends: [
    {
      name: {
        type: String,
        required: true,
      },
      isOnline: {
        type: Boolean,
        default: false,
      },
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

const UserModel = mongoose.model('user', User);

module.exports = UserModel;
