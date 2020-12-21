import styled from 'styled-components';
import { H1, LinkButton } from '../../components';

const Home = () => (
  <PageContainer>
    <Header>
      <H1>Web Chat</H1>
    </Header>
    <Main>
      <LinksContainer>
        <LinkButton to='/login'>Login</LinkButton>
        <LinkButton to='/register'>Register</LinkButton>
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

export default Home;
