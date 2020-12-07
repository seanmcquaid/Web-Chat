const mongoose = require('mongoose');

const Message = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
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

module.exports = Message;
