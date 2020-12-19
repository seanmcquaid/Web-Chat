const UserModel = require('../models/user');
const {
  SEND_MESSAGE,
  GET_CURRENT_MESSAGES,
  RECEIVE_CURRENT_MESSAGES,
  GET_IS_FRIEND_TYPING,
  RECEIVE_IS_FRIEND_TYPING,
  SET_USER_TYPING,
  SET_USER_NOT_TYPING,
} = require('./types');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.sendMessage = (socket) => {
  socket.on(SEND_MESSAGE, async (resp) => {
    const { token, friendName, message } = respo;
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const userInfo = await UserModel.findOne({ _id: id });
    const friendInfo = await UserModel.findOne({ username: friendName });
    const messageInfo = {
      message,
      sentTo: friendInfo.username,
      sentFrom: userInfo.username,
      time: new Date(),
    };

    userInfo.messages = [...userInfo.messages, messageInfo];
    friendInfo.messages = [...friendInfo.messages, messageInfo];

    await userInfo.save();
    await friendInfo.save();
  });
};

exports.currentMessages = (socket) => {
  socket.on(GET_CURRENT_MESSAGES, async (resp) => {
    console.log(resp);
    const { token, friendName } = resp;

    if (!token) {
      return [];
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const userInfo = await UserModel.findOne({ _id: id });
    const messages = userInfo.messages.filter(
      (messageInfo) =>
        messageInfo.sentTo === friendName || messageInfo.sentFrom === friendName
    );

    socket.emit(RECEIVE_CURRENT_MESSAGES, messages);
  });
};

exports.isFriendTyping = (socket) => {
  socket.on(GET_IS_FRIEND_TYPING, async ({ friendName }) => {
    const friendInfo = await UserModel.findOne({ username: friendName });
    const isFriendTyping = friendInfo.isTyping;
    socket.emit(RECEIVE_IS_FRIEND_TYPING, isFriendTyping);
  });
};

exports.setUserTyping = (socket) => {
  socket.on(SET_USER_TYPING, async ({ token }) => {
    console.log('typing');
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const userInfo = await UserModel.findOne({ _id: id });
    userInfo.isTyping = true;
    await userInfo.save();
  });

  socket.on(SET_USER_NOT_TYPING, async ({ token }) => {
    console.log('not typing');
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const userInfo = await UserModel.findOne({ _id: id });
    userInfo.isTyping = false;
    await userInfo.save();
  });
};
