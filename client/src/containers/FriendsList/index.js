import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { ErrorMessage, H1 } from '../../components';
import Friends from './Friends';
import { getUserInfoAction } from '../../store/user/actions';

const FriendsList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfoAction());
  }, [dispatch]);

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
