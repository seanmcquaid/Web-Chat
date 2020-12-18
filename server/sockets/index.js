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

exports.sendMessage = (socket) => {
  socket.on(SEND_MESSAGE, ({ token, friendName, message }) => {
    // add message to both the friend and user's model
  });
};

exports.currentMessages = (socket) => {
  socket.on(GET_CURRENT_MESSAGES, ({ token, friendName }) => {
    // get messages
    socket.emit(RECEIVE_CURRENT_MESSAGES, messages);
  });
};

exports.isFriendTyping = (socket) => {
  socket.on(GET_IS_FRIEND_TYPING, ({ friendName }) => {
    // get typing status from model
    socket.emit(RECEIVE_IS_FRIEND_TYPING, isFriendTyping);
  });
};

exports.setUserTyping = (socket) => {
  socket.on(SET_USER_TYPING, ({ token }) => {
    // set user typing to true in model
  });

  socket.on(SET_USER_NOT_TYPING, ({ token }) => {
    // set user typing to false in model
  });
};
