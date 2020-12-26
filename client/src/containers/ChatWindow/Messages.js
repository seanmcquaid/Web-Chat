import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import socket from '../../sockets';
import { emitGetCurrentMessages } from '../../sockets/emit';
import { RECEIVE_CURRENT_MESSAGES } from '../../sockets/types';
import { tokenSelector } from '../../store/user/selectors';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { name } = useParams();
  const token = useSelector(tokenSelector);

  useEffect(() => {
    const interval = setInterval(() => {
      emitGetCurrentMessages(token, name);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [name, token]);

  useEffect(() => {
    socket.on(RECEIVE_CURRENT_MESSAGES, (data) => {
      setMessages(data);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <MessagesList>
      {messages.map((message, i) => (
        <Message key={i} left={name === message.sentTo}>
          {message.sentFrom} : {message.message}
        </Message>
      ))}
    </MessagesList>
  );
};

const MessagesList = styled.ol`
  list-styled: none;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0 0.25rem;
`;

const Message = styled.li`
  width: 100%;
  display: flex;
  justify-content: ${(props) => (props.left ? 'left' : 'right')};
  align-items: center;
  margin: 0.25rem 0;
  padding: 0.25rem;
  background-color: ${(props) => (props.left ? '#153243' : '#F4F9E9')};
  color: ${(props) => (props.left ? 'white' : 'black')};
  font-family: 'PT Serif', serif;
`;

export default Messages;
