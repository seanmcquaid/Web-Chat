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

UserSchema.methods.addFriend = async function addFriend(name, isOnline) {
  this.friends = [...this.friends, { name, isOnline }];
  return await this.save();
};

UserSchema.methods.deleteFriend = async function deleteFriend(name) {
  this.friends = this.friends.filter((friend) => friend.name !== name);
  return await this.save();
};

UserSchema.methods.addMessage = async function addMessage(message) {
  this.messages = [...this.messages, message];
  return await this.save();
};

UserSchema.methods.hasFriend = async function hasFriend(name) {
  for (let i = 0; i < this.friends.length; i++) {
    const friend = this.friends[i];
    if (friend.name === name) {
      return true;
    }
  }

  return false;
};

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
