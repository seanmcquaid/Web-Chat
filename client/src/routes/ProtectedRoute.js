import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { isLoadingSelector } from '../store/loading/selectors';
import { tokenSelector } from '../store/user/selectors';
import { LoadingSpinner } from '../components';

const ProtectedRoute = (props) => {
  const isLoading = useSelector(isLoadingSelector);
  const token = useSelector(tokenSelector);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!token) {
    return <Redirect to='/' />;
  }

  return <Route {...props} />;
};

export default ProtectedRoute;
