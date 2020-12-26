import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Button, TextInput } from '../../components';
import { loginAction } from '../../store/user/actions';

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, setState] = useState({
    username: '',
    password: '',
  });
  const { username, password } = state;

  const onChange = useCallback((event) => {
    const value = event.target.value;
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: value,
    }));
  }, []);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(loginAction(username, password)).then(() => {
        history.push('/userHome');
      });
    },
    [dispatch, username, password, history]
  );

  return (
    <Form onSubmit={onSubmit}>
      <TextInput
        onChange={onChange}
        value={username}
        name='username'
        type='text'
        label='Username'
        placeholder='Enter username here'
      />
      <TextInput
        onChange={onChange}
        value={password}
        name='password'
        type='password'
        label='Password'
        placeholder='Enter password here'
      />
      <Button type='submit'>Submit</Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default LoginForm;
