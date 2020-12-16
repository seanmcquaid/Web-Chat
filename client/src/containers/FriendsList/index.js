import { useEffect } from 'react';
import styled from 'styled-components';
import { ErrorMessage, H1 } from '../../components';
import Friends from './Friends';

const FriendsList = () => {
  useEffect(() => {
    // dispatch action to get friends here
  }, []);

  return (
    <PageContainer>
      <Header>
        <H1>Friends List</H1>
        <ErrorMessage />
      </Header>
      <MainContent>
        <Friends />
      </MainContent>
    </PageContainer>
  );
};

const PageContainer = styled.div``;

const Header = styled.header``;

const MainContent = styled.main``;

export default FriendsList;
