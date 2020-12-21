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

export default Login;
