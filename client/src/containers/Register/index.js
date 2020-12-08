import styled from 'styled-components';
import { H1 } from '../../components';
import RegisterForm from './RegisterForm';

const Register = () => {
  return (
    <PageContainer>
      <Header>
        <H1>Register</H1>
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
