import Axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { sendMessage } from '../../api/userService';
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
    setInterval(() => {
      emitIsFriendTyping(name);
    }, 3000);
    return () => {
      socket.disconnect();
    };
  }, [name]);

  useEffect(() => {
    setInterval(() => {
      socket.on(RECEIVE_IS_FRIEND_TYPING, (data) => {
        setIsFriendTyping(data);
      });
    }, 3000);
    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    if (message === messageRef.current && !isUserTyping) {
      emitUserNoLongerTyping(token);
      return () => socket.disconnect();
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
      const messageInfo = {
        message,
        sentTo: name,
      };
      const cancelToken = Axios.CancelToken;
      const source = cancelToken.source();
      const config = {
        cancelToken: source.token,
        headers: {
          Authorization: token,
        },
      };
      sendMessage(messageInfo, config).then(({ data }) => {
        console.log(data);
        source.cancel();
      });
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
