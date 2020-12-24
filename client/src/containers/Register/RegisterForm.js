import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Button, TextInput } from '../../components';
import { registerAction } from '../../store/user/actions';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [inputText, setInputText] = useState({
    username: '',
    password: '',
    confirmPassword: '',
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
      dispatch(registerAction(inputText.username, inputText.password)).then(
        () => {
          history.push('/userHome');
        }
      );
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
      {inputText.password !== inputText.confirmPassword ? (
        <span>These passwords don't match!</span>
      ) : null}
      <TextInput
        onChange={onChange}
        value={inputText.password}
        name='password'
        type='password'
        label='Password'
        placeholder='Enter password here'
      />
      <TextInput
        onChange={onChange}
        value={inputText.confirmPassword}
        name='confirmPassword'
        type='password'
        label='Confirm Password'
        placeholder='Enter confirm password here'
      />
      <Button
        disabled={inputText.password !== inputText.confirmPassword}
        type='submit'
      >
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
