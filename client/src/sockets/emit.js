import socket from './index';
import {
  GET_CURRENT_MESSAGES,
  GET_IS_FRIEND_TYPING,
  SEND_MESSAGE,
  SET_USER_TYPING,
} from './types';

export const emitGetCurrentMessages = (token, friendName) =>
  socket.emit(GET_CURRENT_MESSAGES, { token, friendName });

export const emitIsFriendTyping = (friendName) =>
  socket.emit(GET_IS_FRIEND_TYPING, { friendName });

export const emitSetUserTyping = (token) =>
  socket.emit(SET_USER_TYPING, { token });

export const emitSendMessage = (messageInfo) =>
  socket.emit(SEND_MESSAGE, { ...messageInfo });
