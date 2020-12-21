import { Route, Switch } from 'react-router-dom';
import {
  Home,
  Login,
  Register,
  UserHome,
  FriendsList,
  UserSearch,
  ChatWindow,
} from '../containers';
import ProtectedRoute from './ProtectedRoute';

const Routes = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route exact path='/login' component={Login} />
    <Route exact path='/register' component={Register} />
    <ProtectedRoute exact path='/userHome' component={UserHome} />
    <ProtectedRoute exact path='/friendsList' component={FriendsList} />
    <ProtectedRoute exact path='/userSearch' component={UserSearch} />
    <ProtectedRoute exact path='/chatWindow/:name' component={ChatWindow} />
  </Switch>
);

export default Routes;
