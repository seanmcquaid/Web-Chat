import styled from 'styled-components';
import { ErrorMessage, H1 } from '../../components';
import LoginForm from './LoginForm';

const Login = () => {
  return (
    <PageContainer>
      <Header>
        <H1>Login</H1>
        <ErrorMessage />
      </Header>
      <Main>
        <LoginForm />
      </Main>
    </PageContainer>
  );
};

const PageContainer = styled.div``;

const Header = styled.header``;

const Main = styled.main``;

export default Login;
