import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Button, TextInput } from '../../components';
import { registerAction } from '../../store/user/actions';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, setState] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

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
      dispatch(registerAction(state.username, state.password)).then(() => {
        history.push('/userHome');
      });
    },
    [dispatch, state, history]
  );

  return (
    <Form onSubmit={onSubmit}>
      <TextInput
        onChange={onChange}
        value={state.username}
        name='username'
        type='text'
        label='Username'
        placeholder='Enter username here'
      />
      {state.password !== state.confirmPassword ? (
        <span>These passwords don't match!</span>
      ) : null}
      <TextInput
        onChange={onChange}
        value={state.password}
        name='password'
        type='password'
        label='Password'
        placeholder='Enter password here'
      />
      <TextInput
        onChange={onChange}
        value={state.confirmPassword}
        name='confirmPassword'
        type='password'
        label='Confirm Password'
        placeholder='Enter confirm password here'
      />
      <Button disabled={state.password !== state.confirmPassword} type='submit'>
        Submit
      </Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default RegisterForm;
