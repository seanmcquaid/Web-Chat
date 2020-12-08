import styled from 'styled-components';
import { H1, LinkButton } from '../../components';

const Home = () => {
  return (
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
};

const PageContainer = styled.div``;

const Header = styled.header``;

const Main = styled.main``;

const LinksContainer = styled.div``;

export default Home;
