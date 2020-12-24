import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Button, TextInput } from '../../components';
import { loginAction } from '../../store/user/actions';

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [inputText, setInputText] = useState({
    username: '',
    password: '',
  });

  const onChange = useCallback((event) => {
    const value = event.target.value;
    setInputText((state) => ({
      ...state,
      [event.target.name]: value,
    }));
  }, []);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(loginAction(inputText.username, inputText.password)).then(() => {
        history.push('/userHome');
      });
    },
    [dispatch, inputText, history]
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
