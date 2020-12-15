import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ErrorMessage, H1 } from '../../components';
import { friendsListSelector } from '../../store/friends/selectors';
import Friends from './Friends';

const FriendsList = () => {
  useEffect(() => {
    // dispatch action to get user info here
  }, []);

  useEffect(() => {
    // socket for getting user info
  });
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
