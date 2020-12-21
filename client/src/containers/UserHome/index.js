import styled from 'styled-components';
import { H1, LinkButton } from '../../components';

const UserHome = () => (
  <PageContainer>
    <Header>
      <H1>Web Chat Home</H1>
    </Header>
    <Main>
      <LinksContainer>
        <LinkButton to='/userSearch'>User Search</LinkButton>
        <LinkButton to='/friendsList'>Friends List</LinkButton>
      </LinksContainer>
    </Main>
  </PageContainer>
);

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

const LinksContainer = styled.div`
  height: 20%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default UserHome;
