import styled from 'styled-components';
import { ErrorMessage, H1 } from '../../components';
import RegisterForm from './RegisterForm';

const Register = () => {
  return (
    <PageContainer>
      <Header>
        <H1>Register</H1>
        <ErrorMessage />
      </Header>
      <Main>
        <RegisterForm />
      </Main>
    </PageContainer>
  );
};

const PageContainer = styled.div``;

const Header = styled.header``;

const Main = styled.main``;

export default Register;
