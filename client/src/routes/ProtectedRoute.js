import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { tokenSelector } from '../store/user/selectors';

const ProtectedRoute = (props) => {
  const token = useSelector(tokenSelector);

  if (!token) {
    return <Redirect to='/' />;
  }

  return <Route {...props} />;
};

export default ProtectedRoute;
