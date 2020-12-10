import { useEffect } from 'react';
import styled from 'styled-components';
import { H1, LinkButton } from '../../components';
import socket from '../../sockets';

const UserHome = () => {
  useEffect(() => {
    socket.on('connection', (data) => {});
    return () => {};
  }, []);
  return (
    <PageContainer>
      <Header>
        <H1>Web Chat Home</H1>
      </Header>
      <Main>
        <LinksContainer>
          <LinkButton to='/'>User Search</LinkButton>
          <LinkButton to='/'>Friends List</LinkButton>
        </LinksContainer>
      </Main>
    </PageContainer>
  );
};

const PageContainer = styled.div``;

const Header = styled.header``;

const Main = styled.main``;

const LinksContainer = styled.div``;

export default UserHome;
