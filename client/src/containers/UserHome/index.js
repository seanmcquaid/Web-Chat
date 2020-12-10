import styled from 'styled-components';
import { H1, LinkButton } from '../../components';

const UserHome = () => (
  <PageContainer>
    <Header>
      <H1>Web Chat Home</H1>
    </Header>
    <Main>
      <LinksContainer>
        <LinkButton to='/'></LinkButton>
        <LinkButton to='/'></LinkButton>
      </LinksContainer>
    </Main>
  </PageContainer>
);

const PageContainer = styled.div``;

const Header = styled.header``;

const Main = styled.main``;

const LinksContainer = styled.div``;

export default UserHome;
