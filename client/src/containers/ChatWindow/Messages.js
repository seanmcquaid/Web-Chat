import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import socket from '../../sockets';
import { emitGetCurrentMessages } from '../../sockets/emit';
import { GET_CURRENT_MESSAGES } from '../../sockets/types';
import { tokenSelector } from '../../store/user/selectors';

const Messages = () => {
  const [messages, setMessages] = useState();
  const { name } = useParams();
  const token = useSelector(tokenSelector);

  useEffect(() => {
    const timer = setTimeout(() => {
      emitGetCurrentMessages(token, name);
    }, 3000);
    return () => {
      clearTimeout(timer);
      socket.disconnect();
    };
  }, [name, token]);

  useEffect(() => {
    socket.on(GET_CURRENT_MESSAGES, (data) => {
      setMessages(data);
    });
    return () => socket.disconnect();
  }, []);

  return <div></div>;
};
export default Messages;
