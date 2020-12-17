import { useParams } from 'react-router-dom';

const ChatWindow = () => {
  const { name } = useParams();

  useEffect(() => {
    return () => {};
  }, []);
  return <div></div>;
};

export default ChatWindow;
