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
      <Main>
        <Friends />
      </Main>
    </PageContainer>
  );
};
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Header = styled.header`
  height: 20%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = styled.main`
  height: 80%;
  width: 100%;
`;

export default FriendsList;
