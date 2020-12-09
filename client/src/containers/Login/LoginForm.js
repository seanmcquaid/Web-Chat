import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Button, TextInput } from '../../components';
import { loginAction } from '../../store/user/actions';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState({
    username: '',
    password: '',
  });

  const onChange = useCallback((event) => {
    setInputText((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(loginAction(inputText.username, inputText.password));
    },
    [dispatch, inputText]
  );

  return (
    <Form onSubmit={onSubmit}>
      <TextInput
        onChange={onChange}
        value={inputText.username}
        name='username'
        type='text'
        label='Username'
        placeholder='Enter username here'
      />
      <TextInput
        onChange={onChange}
        value={inputText.password}
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
