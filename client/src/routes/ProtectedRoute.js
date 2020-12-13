import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = (props) => {
  // this is a place holder until I implement redux

  // if (props.isLoading) {
  //   return <div>Loading</div>;
  // }

  // if (!props.isAuthenticated) {
  //   return <Redirect to='/' />;
  // }

  return <Route {...props} />;
};

export default ProtectedRoute;
