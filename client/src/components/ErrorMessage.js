import { useSelector } from 'react-redux';
import { P } from './Typography';
import { errorMessageSelector } from '../store/error/selectors';
import { memo } from 'react';

const ErrorMessage = memo(() => {
  const errorMessage = useSelector(errorMessageSelector);
  return <P>{errorMessage}</P>;
});

export default ErrorMessage;
