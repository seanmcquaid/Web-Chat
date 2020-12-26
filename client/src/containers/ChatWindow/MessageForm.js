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
  const [state, setState] = useState({
    message: '',
    isUserTyping: false,
    isFriendTyping: false,
  });
  const { message, isUserTyping, isFriendTyping } = state;
  const token = useSelector(tokenSelector);
  const { name } = useParams();

  useEffect(() => {
    setInterval(() => {
      emitIsFriendTyping(name);
    }, 1000);
  }, [name]);

  useEffect(() => {
    socket.on(RECEIVE_IS_FRIEND_TYPING, (data) => {
      setState((prevState) => ({
        ...prevState,
        isFriendTyping: data,
      }));
    });
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
      const value = event.target.value;
      emitSetUserTyping(token);
      setState((prevState) => ({
        ...prevState,
        [event.target.name]: value,
        isUserTyping: true,
      }));
      const interval = setInterval(() => {
        setState((prevState) => ({
          ...prevState,
          isUserTyping: false,
        }));
      }, 3000);
      return () => {
        clearInterval(interval);
      };
    },
    [token]
  );

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      emitSendMessage({ token, friendName: name, message });
      setState((prevState) => ({
        ...prevState,
        message: '',
      }));
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

const Form = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const FriendTypingText = styled.span``;

export default MessageForm;
