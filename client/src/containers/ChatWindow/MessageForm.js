import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button, TextInput } from '../../components';
import socket from '../../sockets';
import {
  emitIsFriendTyping,
  emitSetUserTyping,
  emitUserNoLongerTyping,
  emitSendMessage,
} from '../../sockets/emit';
import { RECEIVE_IS_FRIEND_TYPING } from '../../sockets/types';
import { tokenSelector } from '../../store/user/selectors';

const MessageForm = () => {
  const [message, setMessage] = useState('');
  const token = useSelector(tokenSelector);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [isFriendTyping, setIsFriendTyping] = useState(false);
  const { name } = useParams();

  useEffect(() => {
    setInterval(() => {
      emitIsFriendTyping(name);
    }, 1000);
  }, [name]);

  useEffect(() => {
    setInterval(() => {
      socket.on(RECEIVE_IS_FRIEND_TYPING, (data) => {
        setIsFriendTyping(data);
      });
    }, 1000);
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isUserTyping) {
      emitUserNoLongerTyping(token);
    }
  }, [isUserTyping, token]);

  const onChange = useCallback(
    (event) => {
      emitSetUserTyping(token);
      setMessage(event.target.value);
      setIsUserTyping(true);
      return () => {
        setIsUserTyping(false);
      };
    },
    [token]
  );

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      emitSendMessage({ token, friendName: name, message });
      setMessage('');
    },
    [token, name, message]
  );

  return (
    <Form onSubmit={onSubmit}>
      {isFriendTyping && (
        <FriendTypingText>{`${name} is typing currently`}</FriendTypingText>
      )}
      <TextInput
        onChange={onChange}
        value={message}
        name='message'
        type='text'
      />
      <Button type='submit'>Send</Button>
    </Form>
  );
};

const Form = styled.form``;

const FriendTypingText = styled.span``;

export default MessageForm;
