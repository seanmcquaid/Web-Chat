const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
        default: true,
      },
      isTyping: {
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

User.methods.addFriend = function (name) {
  this.friends = [...this.friends, { name, isOnline: true, isTyping: false }];
};

User.methods.deleteFriend = function (name) {
  this.friends = this.friends.filter((friend) => friend.name !== name);
};

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
