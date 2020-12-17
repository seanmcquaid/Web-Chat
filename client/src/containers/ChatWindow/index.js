import styled from 'styled-components';
import MessageForm from './MessageForm';
import Messages from './Messages';

const ChatWindow = () => {
  return (
    <PageContainer>
      <Messages />
      <MessageForm />
    </PageContainer>
  );
};

const PageContainer = styled.div``;

export default ChatWindow;
