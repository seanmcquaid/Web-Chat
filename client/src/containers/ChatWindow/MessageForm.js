import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button, TextInput } from '../../components';
import socket from '../../sockets';
import {
  emitIsFriendTyping,
  emitSendMessage,
  emitSetUserTyping,
  emitUserNoLongerTyping,
} from '../../sockets/emit';
import { RECEIVE_IS_FRIEND_TYPING } from '../../sockets/types';
import { tokenSelector } from '../../store/user/selectors';

const MessageForm = () => {
  const [message, setMessage] = useState('');
  const token = useSelector(tokenSelector);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [isFriendTyping, setIsFriendTyping] = useState(false);
  const { name } = useParams();
  const messageRef = useRef(message);

  useEffect(() => {
    const timer = setTimeout(() => {
      emitIsFriendTyping(name);
    }, 3000);
    return () => {
      clearTimeout(timer);
      socket.disconnect();
    };
  }, [name]);

  useEffect(() => {
    socket.on(RECEIVE_IS_FRIEND_TYPING, (data) => {
      setIsFriendTyping(data);
    });
    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    if (message === messageRef.current && !isUserTyping) {
      emitUserNoLongerTyping(token);
      return () => {
        socket.disconnect();
      };
    }
  }, [message, messageRef, isUserTyping, token]);

  const onChange = useCallback(
    (event) => {
      emitSetUserTyping(token);
      setMessage(event.target.value);
      setIsUserTyping(true);
      messageRef.current = event.target.value;
      return () => {
        socket.disconnect();
        setIsUserTyping(false);
      };
    },
    [token]
  );

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      emitSendMessage({
        token,
        friendName: name,
        message,
      });
      setMessage('');
      return () => {
        socket.disconnect();
      };
    },
    [token, name, message]
  );

  return (
    <Form onSubmit={onSubmit}>
      <FriendTypingText>
        {isFriendTyping ? `${name} is typing currently` : null}
      </FriendTypingText>
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
