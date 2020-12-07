import { BrowserRouter, Route } from 'react-router-dom';
import { Home, Login, Register } from '../containers';

const Routes = () => (
  <BrowserRouter>
    <Route exact path='/' component={Home} />
    <Route exact path='/login' component={Login} />
    <Route exact path='/register' component={Register} />
  </BrowserRouter>
);

export default Routes;
