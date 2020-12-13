import { createSelector } from 'reselect';

export const isTypingSelector = ({ messages }) => messages?.isTyping ?? false;
export const messagesSelector = ({ messages }) => messages?.messages ?? [];

export const messagesWithFriendSelector = createSelector(
  messagesSelector,
  (_, friendName) => friendName,
  (messages, friendName) =>
    messages.filter(
      (message) =>
        message.sentTo === friendName || message.sentFrom === friendName
    )
);
