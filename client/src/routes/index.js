import { BrowserRouter, Route } from 'react-router-dom';
import { Home, Login, Register, UserHome } from '../containers';
import ProtectedRoute from './ProtectedRoute';

const Routes = () => (
  <BrowserRouter>
    <Route exact path='/' component={Home} />
    <Route exact path='/login' component={Login} />
    <Route exact path='/register' component={Register} />
    <ProtectedRoute exact path='/userHome' component={UserHome} />
  </BrowserRouter>
);

export default Routes;
